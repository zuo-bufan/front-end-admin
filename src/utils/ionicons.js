/*!
 * Built with http://stenciljs.com
 * 2018-05-26T19:53:42
 */
!(function(e, t, n, r, i, o, s, c, u, a, l, d, p, m) {
	for (
		(l = e.ionicons = e.ionicons || {}).components = u,
			(p = u
				.filter(function(e) {
					return e[2];
				})
				.map(function(e) {
					return e[0];
				})).length &&
				(((d = t.createElement('style')).innerHTML =
					p.join() + '{visibility:hidden}.hydrated{visibility:inherit}'),
				d.setAttribute('data-styles', ''),
				t.head.insertBefore(d, t.head.firstChild)),
			(function(e, t, n) {
				(e['s-apps'] = e['s-apps'] || []).push('ionicons'),
					n.componentOnReady ||
						(n.componentOnReady = function() {
							var t = this;
							function n(n) {
								if (t.nodeName.indexOf('-') > 0) {
									for (var r = e['s-apps'], i = 0, o = 0; o < r.length; o++)
										if (e[r[o]].componentOnReady) {
											if (e[r[o]].componentOnReady(t, n)) return;
											i++;
										}
									if (i < r.length) return void (e['s-cr'] = e['s-cr'] || []).push([ t, n ]);
								}
								n(null);
							}
							return e.Promise ? new e.Promise(n) : { then: n };
						});
			})(e, 0, a),
			i = i || l.resourcesUrl,
			d = (p = t.querySelectorAll('script')).length - 1;
		d >= 0 && !(m = p[d]).src && !m.hasAttribute('data-resources-url');
		d--
	);
	(p = m.getAttribute('data-resources-url')),
		!i && p && (i = p),
		!i && m.src && (i = (p = m.src.split('/').slice(0, -1)).join('/') + (p.length ? '/' : '') + 'ionicons/'),
		(d = t.createElement('script')),
		(function(e, t, n, r) {
			return (
				!(t.search.indexOf('core=esm') > 0) &&
				(!(
					!(t.search.indexOf('core=es5') > 0 || 'file:' === t.protocol) &&
					e.customElements &&
					e.customElements.define &&
					e.fetch &&
					e.CSS &&
					e.CSS.supports &&
					e.CSS.supports('color', 'var(--c)') &&
					'noModule' in n
				) ||
					(function(e) {
						try {
							return new Function('import("")'), !1;
						} catch (e) {}
						return !0;
					})())
			);
		})(e, e.location, d)
			? (d.src = i + 'ionicons.xcgugpyt.js')
			: ((d.src = i + 'ionicons.eyhlcpv8.js'),
				d.setAttribute('type', 'module'),
				d.setAttribute('crossorigin', !0)),
		d.setAttribute('data-resources-url', i),
		d.setAttribute('data-namespace', 'ionicons'),
		t.head.appendChild(d);
})(
	window,
	document,
	0,
	0,
	0,
	0,
	0,
	0,
	[
		[
			'ion-icon',
			'b4az4ysr',
			1,
			[
				[ 'ariaLabel', 2, 1, 'aria-label', 2 ],
				[ 'color', 1, 0, 1, 2 ],
				[ 'doc', 3, 0, 0, 0, 'document' ],
				[ 'el', 7 ],
				[ 'icon', 1, 0, 1, 2 ],
				[ 'ios', 1, 0, 1, 2 ],
				[ 'isServer', 3, 0, 0, 0, 'isServer' ],
				[ 'isVisible', 5 ],
				[ 'md', 1, 0, 1, 2 ],
				[ 'mode', 3, 0, 0, 0, 'mode' ],
				[ 'name', 1, 0, 1, 2 ],
				[ 'resourcesUrl', 3, 0, 0, 0, 'resourcesUrl' ],
				[ 'size', 1, 0, 1, 2 ],
				[ 'src', 1, 0, 1, 2 ],
				[ 'svgContent', 5 ],
				[ 'win', 3, 0, 0, 0, 'window' ]
			],
			1
		]
	],
	HTMLElement.prototype
);
