/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	config.width = 250;
	config.uiColor = '#FFF';
	config.toolbarGroups = [
        { name: 'pbckcode' } ,                   // shows the pbckcode button
    ];
    config.extraPlugins = 'pbckcode';
};
