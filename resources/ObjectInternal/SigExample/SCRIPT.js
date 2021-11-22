// Object hooks

(ui => {
	Simplicite.UI.hooks.SigExample = (o, cbk) => {
		try {
			let sp;
			const p = o.locals.ui;
			if (p && o.isMainInstance()) {
				p.form.onload = (ctn, obj) => {
					$ui.loadScript({
						url: "https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js",
						onload: () => {
							sp = new SignaturePad(document.getElementById('signature'), { backgroundColor: 'rgb(255, 255, 255)' });
						}
					});
				};

				p.form.beforesave = (ctn, obj, rowId, scbk) => {
					try {
						//if (obj.getRowId() !== '0') {
							const doc = 'sigExSignature';
							obj.getField(doc).value({
								object: obj.getName(),
								rowid: obj.getRowId(),
								field: doc,
								id: '0',
								mime: 'image/png',
								name: 'signature.png',
								content: sp.toDataURL().replace(/^data:image\/png;base64,/, '')
							});
						//}
					} finally {
						scbk && scbk();
					}
				};
			}
		} catch (e) {
			console.error(e.message);
		} finally {
			cbk && cbk();
		}
	};
})(window.$ui);
