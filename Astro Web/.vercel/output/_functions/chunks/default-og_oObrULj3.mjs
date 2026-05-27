const defaultOg = new Proxy({"src":"/_astro/default-og.jWlOTf-L.jpg","width":2455,"height":1381,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/public/default-og.jpg";
							}
							
							return target[name];
						}
					});

export { defaultOg as default };
