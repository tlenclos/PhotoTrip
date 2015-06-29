exports.definition = {
    config : {
        "columns": {
            "cid": "INTEGER PRIMARY KEY",
            "_id": "integer",
            "photo": "text",
            "note": "text",
            "lat": "real",
            "lng": "real"
        },
        "URL": Alloy.CFG.siteUrl + "locations",
        "debug": 1, //debug mode enabled
        "adapter" : {
            "type" : "sqlrest",
            "collection_name": "locations",
            "idAttribute" : "cid"
        }
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};
