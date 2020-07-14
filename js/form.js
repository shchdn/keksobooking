'use strict';
(function(){
    var noticeSetup = document.querySelector('.notice');
    var noticeFieldsetsSetup = noticeSetup.querySelectorAll('fieldset');
    window.form = {
        disableNoticeFieldsets: function(){
            for (let i = 0; i < noticeFieldsetsSetup.length; i ++){
                noticeFieldsetsSetup[i].disabled = 'disabled';
            }
        },
        enableNoticeFieldsets: function(){
            for (let i = 0; i < noticeFieldsetsSetup.length; i ++){
                noticeFieldsetsSetup[i].disabled = false;
            }
        }
    }
    form.disableNoticeFieldsets();
})()