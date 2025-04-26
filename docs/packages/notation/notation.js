(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["converse"], factory);
    } else {
        factory(converse);
    }
}(this, function (converse) {
    let _converse = null, html, formatter;

    converse.plugins.add("notation", {
        'dependencies': [],

        'initialize': function () {
            _converse = this._converse;
            html = converse.env.html;

            _converse.api.listen.on('afterMessageBodyTransformed', function(text) {				
				renderNotation(text);
            });	
			
			formatter = new ChordSheetJS.HtmlTableFormatter();
            console.debug("notation plugin is ready");
        }
    });

    function renderNotation(text)  {
		const msgId = Math.random().toString(36).substr(2,9);
        console.debug("renderNotation", text, msgId);

        if (text.length == 0) return;

        if (text.startsWith("X:")) {
            text.addTemplateResult(0, text.length, html`<div id="abc-${msgId}"></div>`);

            setTimeout(function() {
                ABCJS.renderAbc("abc-" + msgId, text.replace(/<br>/g, '\n'), {foregroundColor: ""});	// use default color
            }, 1000);
        }
		else
			
        if (text.startsWith("{comment:") || text.startsWith("{title:")) {
            text.addTemplateResult(0, text.length, html`<div style="overflow-x: hidden;" id="chordpro-${msgId}"></div>`);
			
            setTimeout(function() {			
				const song = chordproParser.parse(text.replace(/<br>/g, '\n'));	
				const ele = document.getElementById("chordpro-" + msgId);
				if (ele) ele.innerHTML = formatter.format(song);
            }, 1000);				
		}			
    }
}));
