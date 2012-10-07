// Gather util methods around Blob, objectURL and GUID.
// ----------------

(function(GWS, undefined) {

    // ### createBlobFromDataURI
    //
    // BlobBuilder is deprecated in favor of Blob constructor but
    // it's not working corectly in Chrome (22) <br />
    // Found on http://stackoverflow.com/a/5100158/230483
    GWS.createBlobFromDataURI = function(dataURI) {
        var dataParts = dataURI.split(',')
            , byteString;

        // convert base64 to raw binary data held in a string
        if (dataParts[0].indexOf('base64') >= 0) {
            byteString = atob(dataParts[1]);
        } else {
            byteString = unescape(dataParts[1]);
        }

        // separate out the mime component
        var mimeString = dataParts[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var bl = byteString.length
            , ab = new ArrayBuffer(bl)
            , ia = new Uint8Array(ab)
            , i;

        for (i = 0; i < bl; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        var BlobBuilder = BlobBuilder || WebKitBlobBuilder;

        if (!BlobBuilder) {
            // Throw an error if BlobBuilder is not supported
            throw new Error("BlobBuilder is unsupported.")
        }

        var bb = new BlobBuilder();
        bb.append(ab);

        return bb.getBlob(mimeString);
    }

    // ### createObjectURL
    //
    // Wrapper around createObjectURL browser methods
    // Get a Blob and return an URL Object
    GWS.createObjectURL = function (blob) {

        if (window.URL && window.URL.createObjectURL) {
            return window.URL.createObjectURL(blob);
        }
        else if (window.webkitURL && window.webkitURL.createObjectURL) {
            return window.webkitURL.createObjectURL(blob);
        }
        else
        {
        	// Throw an error if createObjectURL is not supported
        	throw new Error("createObjectURL is not available in this browser.");
        }
    }

    // ### GUID
    //
    // Generate non-genuine GUID
    // Found on http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    GWS.GUID = function ()
    {
        var S4 = function ()
        {
            return Math.floor(
                    Math.random() * 0x10000 /* 65536 */
                ).toString(16);
        };

        return (
                S4() + S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + S4() + S4()
            );
    }

}(window.GoWithSprite = window.GoWithSprite || {}));
