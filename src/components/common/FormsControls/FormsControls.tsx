import React from "react";
import s from "./FormsControls.module.scss"

type FormsControlsPropsType = {
    input: any
    meta: any
    children: any
}

export const FormControl = ({input, meta, ...props}: FormsControlsPropsType) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={hasError ? s.formControlError : ''}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}