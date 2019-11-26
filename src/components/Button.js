import React from "react";
import {
   action
} from '@storybook/addon-actions';
import classNames from 'classnames'

import "components/Button.scss";

export default function Button(props) {
   //let buttonClass = "button";

   let buttonClass = classNames(
      'button', {
         "button--confirm": props.confirm,
         'button--danger': props.danger
      })

   // if (props.confirm) {
   //    buttonClass += " button--confirm";
   // }

   // if (props.danger) {
   //    buttonClass += " button--danger";
   // }


   return ( < button className = {
         buttonClass
      }
      disabled = {
         props.disabled
      }
      onClick = {
         props.onClick
      } > {
         props.children
      } <
      /button>);
   }