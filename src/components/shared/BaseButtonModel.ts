export type ButtonProps = {
    type: "button" | "submit";
    value: string;
    color: "primary-border" | "primary" | "normal";
    icon?: string;
    disabled?: boolean;
};

export type ButtonEmits = {
    (event: "click"): void;
};
