var AbstractDao = require("core/dao/abstract-dao").AbstractDao,
    Model = require("core/model/model").Model;

exports.VolumeDao = AbstractDao.specialize({
    init: {
        value: function() {
            this._model = Model.Volume;
        }
    }
});
