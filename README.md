# js-dragdrop

With this drag and drop library, it is easy to setup a drop target with just one line of JavaScript. With a drop target, users can drag files from their computer onto your webpage.

A demo is available on my [playground](https://playground.michaelcheng.us/lib-js/dragdrop/).

## Usage
To setup a drop target, simply write

```javascript
const target = document.querySelector('#drop');
iqwerty.dragdrop.setTarget(target);
```

This will find the HTML element with an ID of `drop` and allow files to be dropped there. When files are dropped, it is useful to set a callback so you can process the files

```javascript
iqwerty.dragdrop.setTarget(target).setOnDropCallback((files) => {
	console.log(files);
});
```

The callback will receive one parameter: an array of the `File`s that were dropped.

### Sample application
Drag and drop is recommended to be used with the iQwerty [`http` library](https://github.com/mlcheng/js-http). Thus, the onDrop callback can be written as

```javascript
iqwerty.dragdrop.setTarget(target).setOnDropCallback((files) => {
	files.forEach((file) => { // Upload each file in the array
		$http('upload.php')
			.progress(function(progress) { // Set the progress callback
				console.log('Upload progress ' + Math.floor((progress.loaded/progress.total)*100) + '%');
			})
			.success(function() { // Notify when the upload is successful
				console.log('Upload successful!');
			})
			.post({
				file // Set the 'file' parameter to the current file and POST it to the server
			});
	});
});
```

More information on how the `http` library works can be found [here](https://github.com/mlcheng/js-http).

### Styling
The drop target can be customized in your own CSS file. For example,

```css
#drop {
	background: pink;
	width: 300px;
	height: 150px;
}
```

When dragging a file over the target, the class `iqwerty-dragdrop-over` will be applied to the target. You may then style the target as follows

```css
#drop.iqwerty-dragdrop-over {
	background: blue;
}
```

Have fun!
