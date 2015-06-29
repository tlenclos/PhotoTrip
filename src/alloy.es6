// UI size
// ----------------
function refreshSize() {
    Alloy.Globals.screenWidth = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
    Alloy.Globals.isIos7Plus = OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 7;

    if (OS_ANDROID) {
        Alloy.Globals.platformHeight = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor;
        Alloy.Globals.platformWidth = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
    } else {
        Alloy.Globals.platformHeight = Ti.Platform.displayCaps.platformHeight;
        Alloy.Globals.platformWidth = Ti.Platform.displayCaps.platformWidth;
    }

    Alloy.Globals.isSmall = Alloy.Globals.platformHeight < 568;
    Alloy.Globals.isMedium = Alloy.Globals.platformHeight >= 568 && Alloy.Globals.platformHeight < 667;
    Alloy.Globals.isLarge = Alloy.Globals.platformHeight >= 667;
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
    if (Ti.Gesture.orientation !== Ti.UI.UNKNOWN && (OS_ANDROID || Alloy.isTablet)) {
        refreshSize();
    }
});

refreshSize();
