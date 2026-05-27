import { a as getImage$1 } from './internal_COJ9dbYp.mjs';
import './entrypoint_DrcobDen.mjs';
import './deterministic-string_dIHzor22.mjs';

const imageConfig = {"endpoint":{"route":"/_image"},"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"dangerouslyProcessSVG":false,"domains":[],"remotePatterns":[],"responsiveStyles":false};
								Object.defineProperty(imageConfig, 'assetQueryParams', {
									value: undefined,
									enumerable: false,
									configurable: true,
								});
								const getImage = async (options) => await getImage$1(options, imageConfig);

export { getImage, imageConfig };
