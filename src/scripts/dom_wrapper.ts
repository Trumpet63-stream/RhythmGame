import * as p5 from "p5";

// Lets us code the DOM UI elements as if it were "immediate", i.e. stateless.
export abstract class DOMWrapper {
    private static registry: Map<string, p5.Element> = new Map();

    // uniqueID should be unique within a scene
    public static create(createCall: () => p5.Element, uniqueId: string): { element: p5.Element, alreadyExists: boolean } {
        if (this.registry.has(uniqueId)) {
            return {
                element: this.registry.get(uniqueId),
                alreadyExists: true
            };
        } else {
            let element = createCall();
            this.registry.set(uniqueId, element);
            return {
                element: element,
                alreadyExists: false
            };
        }
    }

    public static clearRegistry(): void {
        this.registry.forEach((value, key, map) => {
            value.remove();
        });
        this.registry.clear();
    }

    // Returns true if remove was successful, otherwise returns false;
    public static removeElementById(id: string): boolean {
        if (this.registry.has(id)) {
            this.registry.get(id).remove();
            this.registry.delete(id);
            return true;
        } else {
            return false;
        }
    }

    // Returns the element if found, otherwise returns undefined;
    public static getElementById(id: string): p5.Element | undefined {
        return this.registry.get(id);
    }
}
