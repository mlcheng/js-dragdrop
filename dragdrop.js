/***********************************************

  "dragdrop.js"

  Created by Michael Cheng on 06/08/2015 22:31
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

"use strict";

var iqwerty = iqwerty || {};

iqwerty.dragdrop = (function() {
	/**
	 * Identifiers for the DragDrop.
	 * Remember to style these in your CSS!!
	 */
	
	// The class applied to the target when the cursor is dragged over
	var CLASS_DROP_OVER = "iqwerty_dragdrop_over";




	/**
	 * The DragDrop object.
	 * @param  {String} target The target where files should be dragged. This should be the ID of an HTML element
	 * @return {Object}        Returns the DragDrop object.
	 */
	function DragDrop(target) {
		if(!(window.File && window.FileList && window.FileReader)) {
			console.log("File upload not supported");
		}


		/**
		 * The target to drop files onto
		 * @type {Element}
		 */
		var _dropTarget = document.getElementById(target);
		_dropTarget.addEventListener("dragover", onDragOver.bind(this));
		_dropTarget.addEventListener("dragleave", onDragLeave.bind(this));
		_dropTarget.addEventListener("drop", onDropHandler.bind(this));

		/**
		 * A list of files dropped
		 * @type {Array}
		 */
		var _files = [];

		/**
		 * The callback when files are dropped
		 * @type {Function}
		 */
		var _onDropCallback = null;

		/**
		 * Emphasize the drop target; used when files are dragged over the target
		 * @param  {Object} event The drag event
		 */
		function showTarget() {
			_dropTarget.classList.add(CLASS_DROP_OVER);
		};

		/**
		 * Return the drop target to its default state; used when user isn't dragging anymore
		 * @param  {Object} event The drag event
		 */
		function hideTarget() {
			_dropTarget.classList.remove(CLASS_DROP_OVER);
		};

		/**
		 * Called when the user drags something over the target
		 * @param  {Object} event The drag event
		 */
		function onDragOver(event) {
			event.stopPropagation();
			event.preventDefault();
			showTarget();
		};

		/**
		 * Called when the user leaves the target
		 * @param  {Object} event The drag event
		 */
		function onDragLeave(event) {
			event.stopPropagation();
			event.preventDefault();
			hideTarget();
		};

		/**
		 * Called when an object is dropped onto the drop target.
		 * Push the file onto the private file stack and call the user defined callback
		 * @param  {Object} event The drop event
		 */
		function onDropHandler(event) {
			onDragLeave(event);

			var files = event.target.files || event.dataTransfer.files;
			for(var i=0, file;file=files[i];i++) {
				_files.push(file);
			}

			// call the user defined drop callback
			if(typeof _onDropCallback === "function") {
				_onDropCallback(_files);


				// files are gone, clean up
				_files = [];
			}
		};

		/**
		 * Set the callback to be called when files are dropped
		 * @param {Function} callback A function to be called when files are dropped
		 */
		this.setOnDropCallback = function(callback) {
			_onDropCallback = callback;
		};
		
		return this;
	};


	return {
		DragDrop: DragDrop
	};
})();