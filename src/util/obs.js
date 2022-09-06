import {dateFormat} from "@/util/upDate";

const ObsConfig = {
  defaultDir: 'upload',
  bucketName: 'yc-obs-test',
  access_key_id: 'BQ3MYKLBPUOP3VCVUZVI',
  secret_access_key: '0rMySqruiLiTQCkKc7wXfLvKKDCwgRDeYEeucKKV',
  server: 'https://yc-obs-test.obs.cn-north-4.myhuaweicloud.com',
  endpoint: 'https://obs.cn-north-4.myhuaweicloud.com'
};


/**
 * 创建ObsClient对象
 */
export const createdObsClient = () => {
  return new ObsClient({
    access_key_id: ObsConfig.access_key_id,
    secret_access_key: ObsConfig.secret_access_key,
    server: ObsConfig.endpoint
  })
};

/**
 * 上传OBS服务器
 * @param file  上传文件
 * @param dir   指定目录
 * @param callback  更新上传进度
 * @param otherParams 其他参数
 * @returns {Promise<any>}
 */
export const uploadOBS = (file, dir, callback, otherParams) => {

  return new Promise((resolve, reject) => {

    var cp;
    var hook;
    var innerHook;
    var cancelFlag = false;

    const fileLength = file.size;
    //实例obs客户端对象
    var obsClient = createdObsClient();

    //拼装上传OBS路径
    const objectKey = getTargetKey(file.name, dir);
    //创建上传uploadId
    var uploadId;
    //调用这里提示跨域问题
    obsClient.uploadFile({
        Bucket: ObsConfig.bucketName,
        Key: objectKey,
        SourceFile: file,
        PartSize: 9 * 1024 * 1024,
        TaskNum: 5,
        ProgressCallback: function (transferredAmount, totalAmount, totalSeconds) {
          //更新上传进度
          let processCall = callback(transferredAmount * 100.0 / totalAmount);
          if (hook && processCall && processCall.cancel) {
            cancelFlag = processCall.cancel;
            // 暂停断点续传任务
            hook.cancel();
          }
        },
        EventCallback: function (eventType, eventParam, eventResult) {
          // 处理事件响应
        },
        ResumeCallback: function (resumeHook, uploadCheckpoint) {
          // 获取取消断点续传上传任务控制参数
          hook = resumeHook;
          // 记录断点
          cp = uploadCheckpoint;
        }
      }, function (err, result) {
        // 出现错误，再次调用断点续传接口，继续上传任务
        if (cancelFlag) {
          console.log("用户取消上传附件")
        } else if (err) {
          console.error('启动断点续传-->' + err);
          obsClient.uploadFile({
            UploadCheckpoint: cp,
            ProgressCallback: function (transferredAmount, totalAmount, totalSeconds) {
              let processCall = callback(transferredAmount * 100.0 / totalAmount);
              if (innerHook && processCall && processCall.cancel) {
                // 暂停断点续传任务
                innerHook.cancel();
              }
            },
            EventCallback: function (eventType, eventParam, eventResult) {
              // 处理事件响应
            },
            ResumeCallback: function (resumeHook, uploadCheckpoint, c, b, e) {
              // 获取取消断点续传上传任务控制参数
              innerHook = resumeHook;
            }
          }, function (err, result) {
            if (err) {
              console.error('断点续传失败-->' + err);
            } else {
              if (result.CommonMsg.Status < 300) {
                // console.log('RequestId-->' + result.InterfaceResult.RequestId);
                // console.log('Bucket-->' + result.InterfaceResult.Bucket);
                // console.log('Key-->' + result.InterfaceResult.Key);
                // console.log('Location-->' + result.InterfaceResult.Location);
                //上传成功 --> 根据之前后端调用成后返回数据的结构组装数据。
                resolve({
                  data: {
                    domain: ObsConfig.endpoint,
                    link: ObsConfig.server + "/" + result.InterfaceResult.Key,
                    name: result.InterfaceResult.Key,
                    originalName: file.name,
                    viewStlUrl: ObsConfig.server + "/" + result.InterfaceResult.Key,
                    url: ObsConfig.server + "/" + result.InterfaceResult.Key,
                  }
                })
              } else {
                console.log('Code-->' + result.CommonMsg.Code);
                console.log('Message-->' + result.CommonMsg.Message);
              }
            }
          });
        } else {
          // console.log('Status-->' + result.CommonMsg.Status, result.InterfaceResult);
          if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
            // console.log('RequestId-->' + result.InterfaceResult.RequestId);
            //上传成功 --> 根据之前后端调用成后返回数据的结构组装数据。
            resolve({
              data: {
                domain: ObsConfig.endpoint,
                link: ObsConfig.server + "/" + result.InterfaceResult.Key,
                name: result.InterfaceResult.Key,
                originalName: file.name,
                viewStlUrl: ObsConfig.server + "/" + result.InterfaceResult.Key,
                url: ObsConfig.server + "/" + result.InterfaceResult.Key,
              }
            })
          }
        }
      }
    );
  })
    .catch(error => {
      console.log(error);
    });
};



/**
 * 上传OBS服务器【弃用：备份之前上传方法备用】
 * @param file  上传文件
 * @param dir   指定目录
 * @param callback  更新上传进度
 * @param otherParams 其他参数
 * @returns {Promise<any>}
 */
export const uploadOBS_BAK = (file, dir, callback, otherParams) => {

  return new Promise((resolve, reject) => {
    //开始时间
    let currentTime = new Date().getTime();

    const fileLength = file.size;
    //实例obs客户端对象
    var obsClient = createdObsClient();

    //拼装上传OBS路径
    const objectKey = getTargetKey(file.name, dir);
    //创建上传uploadId
    var uploadId;
    //调用这里提示跨域问题
    obsClient.initiateMultipartUpload({
      Bucket: ObsConfig.bucketName,
      Key: objectKey,
      CacheControl: "no-cache"
    }).then((result) => {

      if (result && result.CommonMsg.Status < 300) {
        uploadId = result.InterfaceResult.UploadId;

        //切分2M一段
        var partSize = 5 * 1024 * 1024;

        //计算分段总数量
        var partCount = fileLength % partSize === 0 ? Math.floor(fileLength / partSize) : Math.floor(fileLength / partSize) + 1;
        //定义完成进度
        var percentage = (90 / partCount).toFixed(2);
        var events = require('events');
        var eventEmitter = new events.EventEmitter();
        var parts = [];

        //更新进度5%
        callback(5);

        /*
         * 将所有分段上传到bucket
         */
        for (let i = 0; i < partCount; i++) {
          let offset = i * partSize;
          let currPartSize = (i + 1 === partCount) ? fileLength - offset : partSize;
          let partNumber = i + 1;
          obsClient.uploadPart({
            Bucket: ObsConfig.bucketName,
            Key: objectKey,
            PartNumber: partNumber,
            UploadId: uploadId,
            SourceFile: file,
            Offset: offset,
            PartSize: currPartSize,
          }).then((result) => {
            //更新上传进度
            callback(Number(percentage));

            if (result.CommonMsg.Status < 300) {
              parts.push({PartNumber: partNumber, ETag: result.InterfaceResult.ETag});
              if (parts.length === partCount) {
                /*
                 * 排序：升序排序所有分段
                 */
                var _parts = parts.sort((a, b) => {
                  if (a.PartNumber >= b.PartNumber) {
                    return 1;
                  }
                  return -1;
                });

                //触发分段上传完成监听事件
                eventEmitter.emit('upload part finished', _parts);
              }
            } else {
              throw new Error(result.CommonMsg.Code);
            }
          });
        }
        /*
         * 等待所有分段上传完成
         */
        eventEmitter.on('upload part finished', (parts) => {
          /*
           * 完成所有的分段合并
           */
          obsClient.completeMultipartUpload({
            Bucket: ObsConfig.bucketName,
            Key: objectKey,
            UploadId: uploadId,
            Parts: parts,
          }).then((result) => {
            if (result.CommonMsg.Status < 300) {
              console.log(((new Date().getTime() - currentTime) / 1000) + '上传使用秒', result);
              //根据之前后端调用成后返回数据的结构组装数据。
              resolve({
                data: {
                  domain: ObsConfig.endpoint,
                  link: ObsConfig.server + "/" + result.InterfaceResult.Key,
                  name: result.InterfaceResult.Key,
                  originalName: file.name,
                  viewStlUrl: ObsConfig.server + "/" + result.InterfaceResult.Key,
                  url: ObsConfig.server + "/" + result.InterfaceResult.Key,
                }
              })
            }
          });

        });
      }
    }).catch(err => {
        reject(err);
      }
    );
  })
    .catch(error => {
      console.log(error);
    });
};



/**
 * 获取文件路径
 * @param filename  文件名称
 * @param dir     业务路径
 * @returns {*}
 */
export const getTargetKey = (filename, dir) => {
  let key = ObsConfig.defaultDir;
  //组装文件目录
  if (dir) {
    if (dir.substr(0, 1) !== '/') {
      key += "/";
    }
    key += dir;
    if (dir.substr(dir.length - 1, 1) !== '/') {
      key += "/";
    }
  } else {
    key += "/";
  }
  key += dateFormat(new Date(), 'yyyyMMdd') + "/";
  //生成文件随机名称
  key += (guid() + getFileExt(filename));
  return key;
};


/**
 * 获取文件扩展名称
 * @param filename  上传文件名称
 * @returns {string}
 */
export const getFileExt = (filename) => {
  let ext = '';
  if (filename) {
    var index = filename.lastIndexOf(".");
    ext = filename.substr(index);
  }
  return ext;
};

/**
 * 获取文件随机名称
 * @returns {string}
 */
export const guid = () => {
  let now = new Date().getTime();
  let str = `xxxxxxxxxxxx${now}yxxx`;
  return str.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16)
  })
};

