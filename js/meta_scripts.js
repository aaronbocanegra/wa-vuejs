/*
 * reference: https://rudrastyh.com/wordpress/custom-gallery-metabox.html
 * A custom function that checks if element is in array, we'll need it later
 */
function in_array(el, arr) {
	for(var i in arr) {
		if(arr[i] == el) return true;
	}
	return false;
}


jQuery( function( $ ) {
	/**
         * vuejs_gallery Functions
         */

	/*
	 * Sortable images
	 */
	$('ul.vuejs_gallery_mtb').sortable({
		items:'li',
		cursor:'-webkit-grabbing', /* mouse cursor */
		scrollSensitivity:40,
		/*
		You can set your custom CSS styles while this element is dragging
		start:function(event,ui){
			ui.item.css({'background-color':'grey'});
		},
		*/
		stop:function(event,ui){
			ui.item.removeAttr('style');

			var sort = new Array(), /* array of image IDs */
			    gallery = $(this); /* ul.vuejs_gallery_mtb */

			/* each time after dragging we resort our array */
			gallery.find('li').each(function(index){
				sort.push( $(this).attr('data-id') );
			});
			/* add the array value to the hidden input field */
			gallery.parent().next().val( sort.join() );
			/* console.log(sort); */
		}
	});

	/*
	 * Multiple images uploader
	 */
	$('.vuejs_upload_gallery_button').click( function(e){
		e.preventDefault();

		var button = $(this),
		    hiddenfield = button.prev(),
		    hiddenfieldvalue = hiddenfield.val().split(","),
	    	    custom_uploader = wp.media({
			title   : 'Upload Content',
			library : { type: [ 'video',
						'image',
						'audio',
                                             /*
						'text',
						'application',
						'application/pdf',
						'application/vnd.oasis.opendocument.text',
						'application/excel, application/vnd.ms-excel, application/x-excel, application/x-msexcel',
						'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						'application/msword',
						'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
						'application/zip',
						'application/x-tar'
                                              */
					] },
			button  : {text: 'Use Selected Content'},
			multiple: true
		    }).on('select', function() {

			var attachments = custom_uploader.state().get('selection').map(function( a ) {
				a.toJSON();
            			return a;
			}),
			thesamepicture = false,
			i;

			/* loop through all the images */
          		for (i = 0; i < attachments.length; ++i) {
				/* if you don't want the same images to be added multiple time */
				if( !in_array( attachments[i].id, hiddenfieldvalue ) ) {
					/* add HTML element with an image */
                                        var html  = '<li data-id="' + attachments[i].id + '" data-postID="<?=$post->ID?>">\n';
                                            html += '    <img data-src="<?=$image_full?>" src="' + attachments[i].attributes.sizes.thumbnail.url + '" alt="' + attachments[i].attributes.alt + '"/>\n';
                                            html += '    <div class="vuejs-tools-overlay">\n';
                                            html += '        <a href="javascript:void(0);" class="vuejs_gallery_edit" title="Edit Content">\n';
                                            html += '            <svg class="vuejs-edit-icon vuejs-icon" viewBox="0 0 20 20">\n';
					    html += '                <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>\n';
                                            html += '            </svg>\n';
                                            html += '        </a>\n';
                                            html += '        <a href="javascript:void(0);" class="vuejs_gallery_remove" title="Remove Content">\n';
                                            html += '            <svg class="vuejs-del-icon vuejs-icon" viewBox="0 0 20 20">\n';
                                            html += '                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>\n';
                                            html += '            </svg>\n';
                                            html += '        </a>\n';
                                            html += '    </div>\n';
                                            html += '</li>\n';
					$('ul.vuejs_gallery_mtb').append( html );
					/* add an image ID to the array of all images */
					hiddenfieldvalue.push( attachments[i].id );
				} else {
					thesamepicture = true;
				}
          		}
			/* refresh sortable */
			$( "ul.vuejs_gallery_mtb" ).sortable( "refresh" );
			/* add the IDs to the hidden field value */
			hiddenfield.val( hiddenfieldvalue.join() );
			/* you can print a message for users if you want to let you know about the same images */
			if( thesamepicture == true ) alert('The same images are not allowed.');
		}).open();
	});

	/*
	 * Remove certain images
	 */
	$('body').on('click', '.vuejs_gallery_remove', function(){
		var id = $(this).parent().parent().attr('data-id');
		    gallery = $(this).parent().parent().parent();
		    hiddenfield = gallery.parent().next();
		    hiddenfieldvalue = hiddenfield.val().split(",");
		    i = hiddenfieldvalue.indexOf(id);
		$.ajax({
        		url: ajaxurl, // Since WP 2.8 ajaxurl is always defined and points to admin-ajax.php
        		data: {
            			'action' : 'vuejs_delete_attachment', // This is our PHP function below
            			'mid'    : id // This is the variable we are sending via AJAX
        		},
       			 success:function(data) {
            			// console.log(data);
        		},
        		error: function(errorThrown){
            			console.log(errorThrown);
        		}
    		});
		$(this).parent().parent().remove();

		/* remove certain array element */
		if(i != -1) {
			hiddenfieldvalue.splice(i, 1);
		}
		/* add the IDs to the hidden field value */
		hiddenfield.val( hiddenfieldvalue.join() );

		/* refresh sortable */
		gallery.sortable( "refresh" );

		return false;
	});

	/*
	 * Edit item
	 */
	$('body').on('click', '.vuejs_gallery_edit', function(){
		var id = $(this).parent().parent().attr('data-id');
		var overlay = $('#vuejs-overlay');
		var inneroverlay = $('#vuejs-inner-overlay');
                overlay.fadeIn(200);
                inneroverlay.html('<iframe id="vuejs-iframe-overlay" src="/wp-admin/upload.php?item=' + id + '"  title="Edit Attachment"></iframe>');
                $('#vuejs-iframe-overlay').on('load', function(){
			$('#vuejs-iframe-overlay').contents().find('.edit-media-header').hide();
		});
	});

        /*
         * Close Edit Overlay
         */
	$('body').on('click', '#vuejs-close-button', function(){
          $('#vuejs-overlay').fadeOut(200);
          $('#vuejs-inner-overlay').html("");
        });

	/*
	 * Selected item
	 */
	$('body').on('mousedown', 'ul.vuejs_gallery_mtb li', function(){
		var el = $(this);
		el.parent().find('li').removeClass('vuejs-active');
		el.addClass('vuejs-active');
	});

        /**
         * vuejs_videos Functions
         */

        /*
         * Add New Video Fields
         */
         $('body').on('click', '#vuejs_videos_newvideo', function(){
		var form = $('#vuejs_videos_form');
		var nextID = form.find('li').length;
                var html = '<li id="video-' + nextID + '">\n';
                html    += '   <div class="vuejs_video_field vuejs_video_url_field">\n';
                html    += '       <input name="vuejs_custom_videos[' + nextID + '][id]" type="hidden" class="vuejs_video_id" value="' + nextID + '"/>\n';
                html    += '       <input name="vuejs_custom_videos[' + nextID + '][vuejs_video_url]" type="url" class="vuejs_video_url" placeholder="Enter Video URL" value/>\n';
                html    += '       <button type="button" class="vuejs_videos_delete vuejs_upload_gallery_button">Delete Video</button>\n';
                html    += '   </div>\n';
		html    += '</li>\n';

                form.append( html );

                ID = form.find('li').length - 1;
                console.log("Added id Video: " + ID);
         });

         /*
          * Fetch oEmbed Info and add field
          */
         $('body').on('change', '.vuejs_video_url', function(){
         	var ID     = $('#vuejs_videos_form li').index( $(this).parent().parent() );
                var listItem = $(this).parent().parent();
                var url    = $(this).val();
                var postID = $('#vuejs_videos_form').attr('post-id');
                var oembed;
		var dataDiv = listItem.find('.vuejs_video_data');
	        var dataExists = dataDiv.length;

         	$.ajax({
           		url: ajaxurl, // Since WP 2.8 ajaxurl is always defined and points to admin-ajax.php
                	data: {
                       		'action' : 'vuejs_load_video', // This is our PHP function below
                       		'ID'     : ID,
                       		'url'    : url,
                                'post_id': postID
                	},
                	beforeSend:function(xhr) {
                          $( "#vuejs-video-dialog" ).dialog({
      	        	    autoOpen: true,
                            dialogClass: "no-close",
                            show: {
                              effect: "blind",
                              duration: 1000
                            },
                            hide: {
                              effect: "blind",
                              duration: 1000
                            }
                          });
                        },
                	success:function(data) {
                                if(data.data.instance.oembed.thumbnail_url != undefined){
                                        oembed = data.data.instance.oembed.html;
	        	                var html = '<div class="vuejs_video_field vuejs_video_hidden_field vuejs_video_data">\n';
					html    += '    <h3>' + data.data.instance.oembed.title + '</h3>';
               				html    += '    <img class="vuejs_video_thumbnail" src="' + data.data.instance.oembed.thumbnail_url + '" alt="' + data.data.instance.oembed.title + '" />\n';
                			html    += '    <input class="vuejs_video_thumbnail" name="vuejs_custom_videos[' + ID + '][vuejs_video_thumbnail]" type="hidden"  value="' + data.data.instance.oembed.thumbnail_url + '" />\n';
                			html    += '    <input class="vuejs_video_thumbnail_width" name="vuejs_custom_videos[' + ID + '][vuejs_video_thumbnail_width]" type="hidden"  value="' + data.data.instance.oembed.thumbnail_width + '" />\n';
                			html    += '    <input class="vuejs_video_thumbnail_height" name="vuejs_custom_videos[' + ID + '][vuejs_video_thumbnail_height]" type="hidden"  value="' + data.data.instance.oembed.thumbnail_height + '" />\n';
                			html    += '    <input class="vuejs_video_title" name="vuejs_custom_videos[' + ID + '][vuejs_video_title]" type="hidden"  value="' + data.data.instance.oembed.title + '" />\n';
                			html    += '    <input class="vuejs_video_author_name" name="vuejs_custom_videos[' + ID + '][vuejs_video_author_name]" type="hidden"  value="' + data.data.instance.oembed.author_name + '" />\n';
                			html    += '    <input class="vuejs_video_type" name="vuejs_custom_videos[' + ID + '][vuejs_video_type]" type="hidden"  value="oembed" />\n';
                			html    += '    <textarea class="vuejs_video_oembed" name="vuejs_custom_videos[' + ID + '][vuejs_video_oembed]" /></textarea>\n';
                			html    += '</div>\n';
                                        if( dataExists ){
	                               		dataDiv.replaceWith( html );
					}else{
	                               		listItem.append( html );
					}
				        const regex = /width=\"[\d]+\"\sheight=\"[\d]+\"/gm;
                                        const newStyle  = 'style=\"width:100%; height:100%;\"';
                                        if( oembed != undefined ){
                                          	const res = oembed.replace(regex, newStyle);
  		                        	listItem.contents().find('.vuejs_video_oembed').html(res).html();
                                        }
				}
                	},
               		error: function(errorThrown){
                		console.log(errorThrown);
                	},
                	complete:function(data) {
                                $( "#vuejs-video-dialog" ).dialog('close');
		        }
            	});
         });

         /**
          * Remove Video
          */
          $('body').on('click', '.vuejs_videos_delete', function(){
		var listItem = $(this).parent().parent();
		var ID = $('#vuejs_videos_form li').index(listItem);
                listItem.remove();
                console.log( "Video - " + ID + " Removed" );
          });

          /**
           * Lightbox Pop-up to play embed code
           */
          $('body').on('click', '.vuejs_video_thumbnail', function(){
                passive = true;
		var listItem = $(this).parent().parent();
		var ID = $('#vuejs_videos_form li').index(listItem);
                var oembed = listItem.contents().find('.vuejs_video_oembed').val();

                var html  = '<div id="vuejs-video-overlay">\n';
                    html += '    <button id="vuejs-video-close-button">\n';
                    html += '      <svg class="vuejs-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">\n';
                    html += '        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>\n';
                    html += '	   </svg>\n';
                    html += '    </button>\n';
                    html += '    <div id="vuejs-video-inner-overlay"></div>\n';
                    html += '</div>\n';
                listItem.append(html);
                var overlay = $('#vuejs-video-overlay');
                var overlayinner = $('#vuejs-video-inner-overlay');
                var close = $('#vuejs-video-close-button');
                overlayinner.html(oembed).html();
                overlay.fadeIn(200);
                $('body').on('click', close, function(){
			overlay.fadeOut("normal", function() {
				overlay.remove();
			});
                });
          });
});
