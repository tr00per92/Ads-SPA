define(['app'], function (app) {
    app.factory('fileReader', function ($q) {
       function onLoad(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        }

        function readAsDataUrl(file, scope) {
            var deferred = $q.defer(),
                reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        }

        return {
            readAsDataUrl: readAsDataUrl
        };
    });
});
