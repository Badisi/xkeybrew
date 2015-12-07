(function(app) {
    'use strict';

    app.filter('region', function() {

        

        /*function isRegionFree() {
            if( (regionLong & 0xFFFFFFFF) == 0xFFFFFFFF ) {
                //createRegionIcon("region-free.png", "Region Free");
            }
            return null;
        }
        function isOther() {
            if( (regions[0] & 0xFF) == 0xFF ) {
                createRegionIcon("region-other.png", "Other");
            }
            else if( (regions[0] & 0xFF) != 0x00 ) {
                createRegionIcon("region-other.png", "Other (Unknown)");
            }
        }
        function isPAL() {
            if( (regions[1] & 0xFF) == 0xFF ) {
                createRegionIcon("region-pal.png", "PAL");
            }
            else if( (regions[1] & 0xFF) == 0xFE ) {
                createRegionIcon("region-pal.png", "PAL (Excludes AUS/NZ)");
            }
            else if( (regions[1] & 0xFF) == 0x01 ) {
                createRegionIcon("region-pal.png", "PAL (AUZ/NZ only)");
            }
            else if( (regions[1] & 0xFF) != 0x00 ) {
                createRegionIcon("region-pal.png", "PAL (Unknown)");
            }
        },
        function isNTSCJ() {
            if( (regions[2] & 0xFF) == 0xFF ) {
                createRegionIcon("region-ntsc-j.png", "NTSC/J");
            }
            else if( (regions[2] & 0xFF) == 0xFD ) {
                createRegionIcon("region-ntsc-j.png", "NTSC/J (Exclude China)");
            }
            else if( (regions[2] & 0xFF) == 0xFE ) {
                createRegionIcon("region-ntsc-j.png", "NTSC/J (Exclude Japan)");
            }
            else if( (regions[2] & 0xFF) == 0xFC ) {
                createRegionIcon("region-ntsc-j.png", "NTSC/J (Exclude Japan and China)");
            }
            else if( (regions[2] & 0xFF) == 0x01 ) {
                createRegionIcon("region-ntsc-j.png", "NTSC/J (Japan only)");
            }
            else if( (regions[2] & 0xFF) == 0x02 ) {
                createRegionIcon("region-ntsc-j.png", "NTSC/J (China only)");
            }
            else if( (regions[2] & 0xFF) == 0x03 ) {
                createRegionIcon("region-ntsc-j.png", "NTSC/J (Japan and China only)");
            }
            else if( (regions[2] & 0xFF) != 0x00 ) {
                createRegionIcon("region-ntsc-j.png", "NTSC/J (Unknown)");
            }
        },
        function isNTSCU() {
            if( (regions[3] & 0xFF) == 0xFF ) {
                createRegionIcon("region-ntsc-u.png", "NTSC/U");
            }
            else if( (regions[3] & 0xFF) != 0x00 ) {
                 createRegionIcon("region-ntsc-u.png", "NTSC/U (Unknown)");
            }
        }

        return function(game) {
            if( !(game instanceof GameVO) ) {
                throw 'Filter \'region\' are only working with GameVO object.';
            }


        };*/
    });

}(angular.module('xbw.banner', [
    'xbw.vo'
])));
