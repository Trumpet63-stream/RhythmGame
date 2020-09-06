import * as p5 from "p5";
import {DOMWrapper} from "../../dom_wrapper";
import {global} from "../../index";
import {
    drawHeading,
    encloseEachInputLabelPairIntoASubDiv,
    fixRadioDivElement,
    setElementCenterPositionRelative,
    styleRadioOptions
} from "../../ui_util";
import {PlayFromOnline} from "../play_from_online/play_from_online";
import {MenuItem} from "../../menu_item";
import {StorageList, StorageListState} from "./storage_list";

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
        setElementCenterPositionRelative(loadStorageButton.element, 0.5, 0.215, 62, 33);
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
            let storageMenu = drawRadioMenu(p, storageMenuId, storageList.displayedList);
            setElementCenterPositionRelative(storageMenu, 0.5, 0.6, 500, 300);
        }
    }
}

function drawRadioMenu(p: p5, uniqueId: string, items: MenuItem[]): p5.Element {
    let menuClass: string = "storage-radio"
    let menuItemClass: string = "storage-radio-option";
    let radioMenuCreateResult = DOMWrapper.create(() => {
        return p.createRadio();
    }, uniqueId);
    let radioMenu = radioMenuCreateResult.element;
    if (!radioMenuCreateResult.alreadyExists) {
        radioMenu.id("radio-div");
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let radioLabel = item.toString();
            // @ts-ignore
            let radioOption = radioMenu.option(radioLabel);

            // setting the value this way because the two-argument .option method wasn't working
            // setting the value is necessary so we can access the selected mode
            radioOption.value = i;
        }

        // This style is being set on the div containing the radio elements to make it a scrollable box
        radioMenu.addClass(menuClass);
        radioMenu.addClass(global.globalClass);

        encloseEachInputLabelPairIntoASubDiv(p, radioMenu);
        fixRadioDivElement(radioMenu);
        styleRadioOptions(p, radioMenu, [menuItemClass, global.globalClass]);
    }
    return radioMenu;
}

function drawPageControls(p: p5, playlistMenuId: string) {
    let pageControlsDiv = DOMWrapper.create(() => {
        return p.createDiv();
    }, "pageControlsDiv");
    if (!pageControlsDiv.alreadyExists) {
        pageControlsDiv.element.addClass("page-controls");
        pageControlsDiv.element.addClass(PlayFromOnline.PLAY_FROM_ONLINE_CLASS);
        pageControlsDiv.element.addClass(global.globalClass);
        setElementCenterPositionRelative(pageControlsDiv.element, 0.5, 0.383, 140, 30);
    }

    let pageNumberText = DOMWrapper.create(() => {
        let textContainer = p.createElement("span");
        textContainer.addClass(global.globalClass);
        return textContainer;
    }, "pageNumberText");

    let previousPageButton = DOMWrapper.create(() => {
        return p.createButton("&#8249;");
    }, "previousPageButton");
    if (!previousPageButton.alreadyExists) {
        previousPageButton.element.mouseClicked(() => {
            global.onlinePlaylist.previousPage();
            DOMWrapper.removeElementById(playlistMenuId);
            pageNumberText.element.html("Page " + (global.onlinePlaylist.getPage() + 1));
        });
        previousPageButton.element.addClass("page-control-button");
        pageControlsDiv.element.child(previousPageButton.element);
    }

    if (!pageNumberText.alreadyExists) {
        pageControlsDiv.element.child(pageNumberText.element);
        pageNumberText.element.html("Page " + (global.onlinePlaylist.getPage() + 1));
    }

    let nextPageButton = DOMWrapper.create(() => {
        return p.createButton("&#8250;");
    }, "nextPageButton");
    if (!nextPageButton.alreadyExists) {
        nextPageButton.element.mouseClicked(() => {
            global.onlinePlaylist.nextPage();
            DOMWrapper.removeElementById(playlistMenuId);
            pageNumberText.element.html("Page " + (global.onlinePlaylist.getPage() + 1));
        });
        nextPageButton.element.addClass("page-control-button");
        pageControlsDiv.element.child(nextPageButton.element);
    }
}