// Imports
import * as React from 'react'
import * as classnames from 'classnames'

import { BaseControlComponent } from '../_Common/BaseControl/BaseControl'
import { RadioGroupStyles, getStyles } from './styles';
import { style } from 'typestyle';
import withTheme, { WithThemeProps } from '../../../Common/theming/withTheme';
import defaultTheme from '../../../Common/theming';
import {BaseControlProps} from '../_Common/BaseControl/BaseControl' 
import { IntentType } from '../../../Common/theming/types';
import UpSvgIcon from '../../Display/SvgIcon';
import { IconName } from '../../../Common/theming/icons';
import { ReactNode } from 'react';

// Exports
export type Position = 'left' | 'right' ;
export type AlignMode = 'horizontal' | 'vertical' ; 
export type DisplayMode = 'normal' | 'button' | 'large' ;

export interface Option {
    value:any;
    text?:string;
    iconName?:IconName;
    name?:string;
    checked?:boolean;
    intent?: IntentType;
    toggledElement?: Array<ReactNode> | ReactNode;
}

export interface UpRadioStyledProps extends Option {
    className?:string;
    gutter?:number;
    tabIndex?: number;
    onChange?:(e:any) => void;
}

export interface UpRadioState {
    options?: Array<Option>;
    value?:any;
}

export interface UpRadioProps extends BaseControlProps<any> {
    options: Array<Option>;
    position?:Position;
    name:string;
    value?:any;
    alignMode?: AlignMode,
    displayMode?: DisplayMode,
    gutter?:number,
    onChange?: (arg: any, event: any, error?: string) => void;
    flexWrap?: boolean;
}

export type RadioGroupProps = {
    className?:string;
    gutter?:number;
    flexWrap?: boolean;
}

const RadioGroup: React.StatelessComponent<RadioGroupProps & WithThemeProps> = (props) => {
    const { children, className } = props;
    return (
      <div onClick={this.stopPropagation} className={classnames(className, style(RadioGroupStyles(props)))}>
        {children}
      </div>
    )
  }

const BaseRadioButton: React.StatelessComponent<UpRadioStyledProps & WithThemeProps> = (props : UpRadioStyledProps & WithThemeProps) => {
    const { checked, iconName, className, name, text, value, onChange, intent, toggledElement: field, tabIndex } = props;
    return (
        <>
        <label className={classnames("up-control", "up-radio", getStyles(props), intent ? `up-intent-${intent}` : null, className)}>
            <input checked={checked} onChange={(e) => {e.persist(); onChange(e)}} name={name} type="radio" value={value} tabIndex={tabIndex} />
            <span className="up-control-wrapper">
                <span className="up-control-indicator"></span>
            </span>
            <span className="up-control-text">
            {iconName &&
                <UpSvgIcon iconName={iconName} />
            }
            <span>{text}</span>
            </span>
        </label>
        {checked && field}
      </>
    )
}

// Exports
class UpRadio extends BaseControlComponent<UpRadioProps, any> {

    public static defaultProps: UpRadioProps = {
        alignMode: "horizontal",
        displayMode: "normal",
        options: [],
        name: "option",
        showError: true,
        theme:defaultTheme,
    }

    constructor(props) {
        super(props);
    }

    stopPropagation = (event) => {
        event.stopPropagation();
    }

    getValue(data: any) {
        return (data == null) ? null :
            data.target != null ? data.target.value
                : data
    }

    public dispatchOnChange = (data: any, event?, error?: string) => {
        if (this.props.onChange !== undefined) {
            this.props.onChange(event, data, error);
        }
    }

    get isControlled() {
        return this.props.value !== undefined;
    }

    get currentValue() {
        return this.isControlled ? this.props.value : this.state.value;
    }
    
    showError() {
        return this.props.showError !== undefined
            ? this.props.showError === true
            : this.hasError;
    }

    showSuccess() {
        return this.props.showSuccess
    }

    renderControl() {
        const options = this.props.options;
        var radioGroupClass = `upContainer__groupradio upContainer__groupradio-${this.props.displayMode} upContainer__groupradio-${this.props.alignMode}`;

        return (
            <RadioGroup className={radioGroupClass} gutter={this.props.gutter} flexWrap={this.props.flexWrap} theme={this.props.theme}>
                {/* Avoid set active element when using the component inside a label */}
                <label style={{ display: "none" }}><input type="radio" /></label>
                {options.map((option, i) => {
                    return (
                        <BaseRadioButton 
                            intent={option.intent}
                            onChange={this.handleChangeEvent} 
                            key={`Key_${this.props.name}_${option.value}`}
                            name={this.props.name}
                            checked={this.currentValue != null && this.currentValue === option.value}
                            text={option.text}
                            iconName={option.iconName}
                            theme={this.props.theme}
                            value={option.value}
                            toggledElement={option.toggledElement}
                            tabIndex={this.props.tabIndex}>
                        </BaseRadioButton>
                    )
                })}
            </RadioGroup>
        );
    }
}

export default withTheme<UpRadioProps>(UpRadio);