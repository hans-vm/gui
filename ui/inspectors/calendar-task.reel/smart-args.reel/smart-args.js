/**
 * @module ui/scrub-args.reel
 */
var Component = require("montage/ui/component").Component,
    DiskSelftestType = require('core/model/enumerations/disk-selftest-type').DiskSelftestType;

/**
 * @class SmartArgs
 * @extends Component
 */
exports.SmartArgs = Component.specialize(/** @lends SmartArgs# */ {
    templateDidLoad: {
        value: function() {
            this.testTypes = DiskSelftestType.members.map(function(x) {
                return {
                    label: x.toLowerCase().toCapitalized(),
                    value: x
                };
            });
        }
    },

    enterDocument: {
        value: function() {
            var self = this;
            this.application.storageService.listDisks().then(function(disks) {
                self.disks = disks;
            });
        }
    }
});
