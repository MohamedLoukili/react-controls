import { Tooltip } from '../../Display/Tooltip'
import { IconName } from '../../../Common/theming/icons';
import { WithThemeProps } from '../../../Common/theming/withTheme';
import { CommonInputTextProps } from '../_Common/BaseControl/BaseInput';

// Exports
export type WidthSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'fill' ;
export type HeightSize = 'normal' | 'large' ;
export type InputType = 'text' | 'email' | 'number' | 'integer' | 'phone' | 'search' ;

export interface Validation {
    pattern : RegExp;
    errorMessage: string;
}

export interface UpInputStyledProps extends CommonProps<string> {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    type?: InputType;
    iconName?: IconName;
    hasError?: boolean;
    showError?:boolean;
    onChange?: (data: any) => void;
    className?: string;
    value:string;
    maxLength?:number;
    dataFor?:string; // Use for tooltip
}

export interface CommonProps<VT> extends CommonInputTextProps<VT> {
    disabled?: boolean;
    placeholder?: string;
    height?: HeightSize;
    width?: WidthSize;
    readonly?: boolean;
    tooltip?: string | Tooltip;
    showError?: boolean;
}

export interface UpInputProps extends CommonProps<string> {
    type?: InputType;
    hasError?: boolean;
    iconName?:IconName;
    value?:string;
    validation?:Array<Validation>;
    maxLength?:number;
}
