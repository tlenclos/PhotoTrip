import exif from 'Exif';

class AddInfoPage {
    constructor() {
        this.handlePhotoPicker = _.bind(this.handlePhotoPicker, this);
        this.handleSave = _.bind(this.handleSave, this);
        this.photoOptions = [L('take_a_picture'), L('choose_from_media_gallery'), L('cancel')];
        this.image = null;
        this.geoloc = null;

        Ti.Geolocation.getCurrentPosition((e) => {
            this.geoloc = e.coords;
            console.log('location', this.geoloc);
        });


        $.modalWrapper.addEventListener('click', () => {
            $.addInfo.close();
        });
        $.photo.addEventListener('click', this.handlePhotoPicker);
        $.save.addEventListener('click', this.handleSave);
    }

    handleSave() {
        // TODO Handle photo
        var location = Alloy.createModel('locations', {
            note: $.textArea.value,
            lat: this.geoloc.latitude,
            lng: this.geoloc.longitude
        });
        location.save();

        $.addInfo.close();
    }

    getLocationFromPhoto(photo) {
        var exifData = exif.fromBlob(photo);
        console.log('EXIF', exifData);

        if (exifData['GPSLatitude'] && exifData['GPSLongitude']) {

        } else {
            // Use location from user

        }
    }

    handlePhotoPicker() {
        var dialog = Titanium.UI.createOptionDialog({
            options: this.photoOptions,
            cancel: _.indexOf(this.photoOptions, L('cancel'))
        });
        dialog.show();
        dialog.addEventListener('click', (e) => {
            if (_.indexOf(this.photoOptions, L('take_a_picture')) === e.index) {
                Titanium.Media.showCamera({
                    success: (e) => {
                        if (e.mediaType === Ti.Media.MEDIA_TYPE_PHOTO) {
                            this.image = e.media;
                            this.getLocationFromPhoto(this.image);
                        } else {
                            helper.alert("error", L('please_take_a_picture_illegale_media_type'));
                        }
                    },
                    cancel: function() {},
                    error: function(error) {},
                    saveToPhotoGallery: true,
                    mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
                });
            } else if (_.indexOf(this.photoOptions, L('choose_from_media_gallery')) === e.index) {
                Ti.Media.openPhotoGallery({
                    allowEditing: false,
                    cancel: function(e) {
                        return console.log('cancel');
                    },
                    error: function(e) {
                        return alert('error');
                    },
                    mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
                    success: (e) => {
                        if (e.mediaType !== Ti.Media.MEDIA_TYPE_PHOTO) {
                            alert(L('please_choose_a_picture'));
                            return;
                        }

                        this.image = e.media;
                        this.getLocationFromPhoto(this.image);
                    }
                });
            }
        });
    }
}
var page = new AddInfoPage();


