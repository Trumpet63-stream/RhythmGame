import {global} from "../../index";
import * as p5 from "p5";
import {createLabeledInput, drawHeading, setElementCenterPositionRelative} from "../../ui_util";
import {DOMWrapper} from "../../dom_wrapper";
import {Config} from "../../config";
import {PageManager, Pages} from "../page_manager";

export abstract class Login {
    private static LOGIN_CLASS: string = "login";

    public static draw() {
        drawHeading();
        let p: p5 = global.p5Scene.sketchInstance;
        p.background(global.playFromFileBackground);
        let config: Config = global.config;

        let usernameInput = createLabeledInput("Username", "usernameInput",
            this.blankIfUndefined(config.username), Login.LOGIN_CLASS);
        // @ts-ignore
        let usernameInputDiv = new p5.Element(usernameInput.element.parent());
        setElementCenterPositionRelative(usernameInputDiv, 0.50, 0.35, 500, 38);

        let passwordInput = createLabeledInput("Password", "passwordInput",
            this.obfuscate(config.password), Login.LOGIN_CLASS);
        // @ts-ignore
        let passwordInputDiv = new p5.Element(passwordInput.element.parent());
        setElementCenterPositionRelative(passwordInputDiv, 0.50, 0.50, 500, 38);

        let submitButton = DOMWrapper.create(() => {
            return p.createButton("Submit");
        }, "submitButton");
        setElementCenterPositionRelative(submitButton.element, 0.50, 0.65, 62, 33);
        if (!submitButton.alreadyExists) {
            submitButton.element.addClass(global.globalClass);
            submitButton.element.addClass(Login.LOGIN_CLASS);
            submitButton.element.mouseClicked(() => {
                let username: string | number = usernameInput.element.value();
                let password: string | number = passwordInput.element.value();
                if (this.isString(username) && this.isString(password)) {
                    config.username = <string>username;
                    if (!this.isObfuscated(<string>password)) {
                        config.password = <string>password;
                    }
                    config.save();
                    PageManager.setCurrentPage(Pages.OPTIONS);
                }
            });
        }
    }

    private static obfuscate(s: string) {
        if (s === undefined) {
            return "";
        }
        let obfuscated = "";
        for (let i = 0; i < s.length; i++) {
            obfuscated += "•";
        }
        return obfuscated;
    }

    private static blankIfUndefined(s: string) {
        if (s === undefined) {
            return "";
        }
        return s;
    }

    private static isString(value: number | string) {
        return typeof value === "string";
    }

    private static isObfuscated(s: string) {
        return s.includes("•");
    }
}