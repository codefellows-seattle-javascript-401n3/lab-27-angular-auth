'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('uploadGalleryPic');
    return authService.getToken()
    .then(token => {
      let url = `http://localhost:3000/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };
      let data = {
        name: picData.name,
        desc: picData.desc,
        file: picData.file
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: data
      });
    })
    .then(res => {
      galleryData.pics.unshift(res.data);
      return res.data;
    })
    .catch(err => {
      console.log('------MADE IT INTO ERROR-----');
      console.log(err);
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
