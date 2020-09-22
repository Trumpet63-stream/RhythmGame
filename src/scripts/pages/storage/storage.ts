import * as p5 from "p5";
import {DOMWrapper} from "../../dom_wrapper";
import {global} from "../../index";
import {drawHeading, setElementCenterPositionRelative} from "../../ui_util";
import {StorageList, StorageListState} from "./storage_list";
import {RadioTable} from "../../radio_table";
import {PageControls} from "../../page_controls";

export abstract class Storage {
    public static draw() {
        drawHeading();
        let storageList: StorageList = <StorageList>global.storageList;
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);
        let storageMenuId: string = "storage-menu";

        let loadStorageButton = DOMWrapper.create(() => {
            return p.createButton("Load");
        }, "loadStorageButton");
        setElementCenterPositionRelative(loadStorageButton.element, 0.5, 0.2, 62, 33);
        if (!loadStorageButton.alreadyExists) {
            loadStorageButton.element.addClass(global.globalClass);
            loadStorageButton.element.mouseClicked(() => {
                loadStorageButton.element.attribute('disabled', '');
                DOMWrapper.removeElementById(storageMenuId);
                storageList.kickOffLoadStorageList();
            });
        }

        if (storageList.state === StorageListState.STORAGE_READY) {
            loadStorageButton.element.removeAttribute('disabled');

            let pageControls = PageControls.create(storageMenuId, storageList).element;
            setElementCenterPositionRelative(pageControls, 0.5, 0.3, 140, 30);

            let storageMenu = RadioTable.create(storageMenuId, 630, 300, [60, 16, 10, 14],
                ["Song Title", "Top Score", "Plays", "Size"], storageList.currentContents).element;
            setElementCenterPositionRelative(storageMenu, 0.5, 0.60, 630, 260);
        }
    }
}