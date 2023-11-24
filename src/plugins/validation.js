
import {Form as VeeForm ,configure, Field as VeeField ,defineRule,ErrorMessage} from 'vee-validate';
import {required , not_one_of as excluded , confirmed ,max ,min , email , min_value as minVal , max_value as maxVal} from '@vee-validate/rules';
export default {
    install(app){
        app.component("VeeForm",VeeForm)
        app.component("VeeField",VeeField);
        app.component("ErrorMessage",ErrorMessage)

        defineRule('required',required)
        defineRule('song_title',required)
        defineRule('song_genre',required)
        defineRule('tos',required)
        defineRule('email',email)
        defineRule('min',min)
        defineRule('max',max)
        defineRule('max_value',maxVal)
        defineRule('min_value',minVal)
        defineRule('passwords_mismatch',confirmed)
        defineRule('excluded',excluded)
        defineRule('country_excluded',excluded)
        // defineRule('alpha_spaces',alphaSpaces)


        configure({
            generateMessage:(ctx)=>{
                const messages={
                    required:`the field ${ctx.field} is required`,
                    min:`The field ${ctx.field} is to short`,
                    max:`The field ${ctx.field} is to long`,
                    song_title:`The song title is to required`,
                    email:`The field ${ctx.field} must be a valide email`,
                    alpha_spaces:`The field ${ctx.field} may only contain alphabetical characters`,
                    country_excluded:`The country dont not have access to our service please `,
                    exclude:`Your not allow to use  ${ctx.field} must be a valide email`,
                    passwords_mismatch:`The password dont match`,
                    tos:`You are required to accept the terms of validation`,
                    
                };

                const message = messages[ctx.rule.name] ?
                messages[ctx.rule.name] :
                `the field  ${ctx.field} is invalid or required`


                return message
            },
        
        validateOnBlur:true,
        //ppermite to validate while the input is changing
        validateOnChange:true,
        validateOnInput:false,
        validateOnModelUpdate:true
        })
    }
}

