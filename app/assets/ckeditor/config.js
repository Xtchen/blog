/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	
};
CKEDITOR.config.toolbarLocation = 'top';
CKEDITOR.config.toolbarGroups = [
 			{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
 			{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
 			{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
 			{ name: 'forms' },
 			'/',
 			{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
 			{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
 			{ name: 'links' },
 			{ name: 'insert' },
 			'/',
 			{ name: 'styles' },
 			{ name: 'colors' },
 			{ name: 'tools' },
 			{ name: 'others' },
 			{ name: 'pbckcode' }
 		];
 CKEDITOR.config.toolbar_Basic = [
 			['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'pbckcode']
 		];
CKEDITOR.config.extraPlugins = 'pbckcode';
CKEDITOR.config.pbckcode = {
        modes :  [ ["C/C++", "c_pp"],['Java', 'java'] ],
        theme : 'clouds_midnight',
        highlighter : "PRETTIFY"
    };
//CKEDITOR.config.toolbar = 'Basic';