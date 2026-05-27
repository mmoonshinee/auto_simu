import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate, B as maybeRenderHead } from './entrypoint_DrcobDen.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_CpAOXY_u.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

const $$Upload = createComponent(($$result, $$props, $$slots) => {
  const title = "FEA Analysis | " + config.site.title;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "Upload CAD files for real ANSYS FEA analysis", "data-astro-cid-gyrmc7w2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto max-w-3xl px-4 py-16 sm:px-6" data-astro-cid-gyrmc7w2> <h1 class="text-3xl font-bold mb-2" data-astro-cid-gyrmc7w2>FEA Analysis</h1> <p class="text-muted-foreground mb-4" data-astro-cid-gyrmc7w2>
Upload a STEP file for automated ANSYS Mechanical FEA. Your file is sent to our analysis server for real structural simulation.
</p> <!-- Configuration Toggle --> <div class="mb-4" data-astro-cid-gyrmc7w2> <button id="cfg-toggle" class="text-sm text-muted-foreground hover:text-foreground underline" data-astro-cid-gyrmc7w2>
Server Configuration
</button> <div id="cfg-panel" class="hidden mt-2 p-4 border border-border rounded-lg bg-muted/30 space-y-3" data-astro-cid-gyrmc7w2> <div data-astro-cid-gyrmc7w2> <label class="block text-sm font-medium mb-1" data-astro-cid-gyrmc7w2>FEA Backend URL</label> <input type="text" id="cfg-backend-url" class="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm
                        focus:outline-none focus:border-accent" placeholder="http://localhost:8000" data-astro-cid-gyrmc7w2> <p class="text-xs text-muted-foreground mt-0.5" data-astro-cid-gyrmc7w2>URL of the ANSYS FEA server (local or tunnel)</p> </div> <div data-astro-cid-gyrmc7w2> <label class="block text-sm font-medium mb-1" data-astro-cid-gyrmc7w2>API Token</label> <input type="password" id="cfg-api-token" class="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm
                        focus:outline-none focus:border-accent" placeholder="Bearer token for FEA server" data-astro-cid-gyrmc7w2> <p class="text-xs text-muted-foreground mt-0.5" data-astro-cid-gyrmc7w2>Only needed if your FEA server requires auth</p> </div> <button id="cfg-save" class="bg-accent text-accent-foreground px-4 py-1.5 rounded-md text-sm font-medium
                       hover:opacity-90" data-astro-cid-gyrmc7w2>
Save
</button> </div> </div> <!-- Upload Area --> <div id="upload-zone" class="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer
                hover:border-accent transition-colors mb-6" data-astro-cid-gyrmc7w2> <input type="file" id="file-input" accept=".step,.stp,.iges,.igs,.x_t,.x_b" class="hidden" data-astro-cid-gyrmc7w2> <div id="upload-prompt" data-astro-cid-gyrmc7w2> <svg class="mx-auto h-12 w-12 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-gyrmc7w2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" data-astro-cid-gyrmc7w2></path> </svg> <p class="text-lg font-medium" data-astro-cid-gyrmc7w2>Drop STEP file here or click to browse</p> <p class="text-sm text-muted-foreground mt-1" data-astro-cid-gyrmc7w2>STEP, IGES, or Parasolid — Max 50MB</p> </div> <div id="upload-status" class="hidden" data-astro-cid-gyrmc7w2> <p id="upload-filename" class="text-lg font-medium" data-astro-cid-gyrmc7w2></p> <p id="upload-message" class="text-sm text-muted-foreground mt-1" data-astro-cid-gyrmc7w2></p> </div> </div> <!-- FEA Settings --> <div id="fea-settings" class="hidden mb-6 p-4 border border-border rounded-lg space-y-4" data-astro-cid-gyrmc7w2> <h2 class="text-lg font-semibold" data-astro-cid-gyrmc7w2>Analysis Settings</h2> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4" data-astro-cid-gyrmc7w2> <div data-astro-cid-gyrmc7w2> <label class="block text-sm font-medium mb-1" data-astro-cid-gyrmc7w2>Material</label> <select id="fea-material" class="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm
                         focus:outline-none focus:border-accent" data-astro-cid-gyrmc7w2> <option value="Structural Steel" data-astro-cid-gyrmc7w2>Structural Steel</option> <option value="Aluminum Alloy" data-astro-cid-gyrmc7w2>Aluminum Alloy</option> <option value="Stainless Steel" data-astro-cid-gyrmc7w2>Stainless Steel</option> </select> </div> <div data-astro-cid-gyrmc7w2> <label class="block text-sm font-medium mb-1" data-astro-cid-gyrmc7w2>Force Direction</label> <select id="fea-force-dir" class="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm
                         focus:outline-none focus:border-accent" data-astro-cid-gyrmc7w2> <option value="+Z" data-astro-cid-gyrmc7w2>+Z</option> <option value="-Z" data-astro-cid-gyrmc7w2>-Z</option> <option value="+Y" data-astro-cid-gyrmc7w2>+Y</option> <option value="-Y" data-astro-cid-gyrmc7w2>-Y</option> <option value="+X" data-astro-cid-gyrmc7w2>+X</option> <option value="-X" data-astro-cid-gyrmc7w2>-X</option> </select> </div> <div data-astro-cid-gyrmc7w2> <label class="block text-sm font-medium mb-1" data-astro-cid-gyrmc7w2>Force (N)</label> <input type="number" id="fea-force-n" value="5000" min="1" max="1000000" class="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm
                        focus:outline-none focus:border-accent" data-astro-cid-gyrmc7w2> </div> </div> <button id="fea-run-btn" class="bg-accent text-accent-foreground px-6 py-2 rounded-md text-sm font-medium
                     hover:opacity-90 transition-opacity disabled:opacity-50" data-astro-cid-gyrmc7w2>
Run FEA Analysis
</button> </div> <!-- Progress --> <div id="fea-progress" class="hidden mb-6 p-4 border border-border rounded-lg" data-astro-cid-gyrmc7w2> <p class="text-sm font-medium mb-2" id="fea-progress-text" data-astro-cid-gyrmc7w2>Starting...</p> <div class="w-full bg-muted rounded-full h-3 overflow-hidden" data-astro-cid-gyrmc7w2> <div id="fea-progress-bar" class="bg-accent h-full rounded-full transition-all duration-500" style="width: 0%" data-astro-cid-gyrmc7w2></div> </div> <p class="text-xs text-muted-foreground mt-2" data-astro-cid-gyrmc7w2>
ANSYS Mechanical cold start takes ~90s. Full analysis: 3-5 minutes.
</p> </div> <!-- Results --> <div id="fea-results" class="hidden mb-6 p-4 border border-accent/30 rounded-lg bg-muted/20" data-astro-cid-gyrmc7w2> <h2 class="text-lg font-semibold mb-3" data-astro-cid-gyrmc7w2>FEA Results</h2> <div id="fea-result-summary" class="text-sm space-y-1 mb-4" data-astro-cid-gyrmc7w2></div> <div id="fea-result-images" class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-astro-cid-gyrmc7w2></div> </div> <!-- Chat Area --> <div id="chat-container" class="hidden border border-border rounded-lg overflow-hidden" data-astro-cid-gyrmc7w2> <div class="border-b border-border px-4 py-2 bg-muted/30" data-astro-cid-gyrmc7w2> <p class="text-sm font-medium" data-astro-cid-gyrmc7w2>AI Analysis Chat</p> <p class="text-xs text-muted-foreground" data-astro-cid-gyrmc7w2>Ask about the geometry, results, or design improvements</p> </div> <div id="chat-messages" class="h-96 overflow-y-auto p-4 space-y-3 bg-background" data-astro-cid-gyrmc7w2> <div class="flex gap-2" data-astro-cid-gyrmc7w2> <span class="text-accent font-bold shrink-0" data-astro-cid-gyrmc7w2>AI:</span> <p class="text-sm" data-astro-cid-gyrmc7w2>File loaded. Run FEA analysis to get real results, or ask me about the geometry and expected load cases.</p> </div> </div> <div class="border-t border-border p-3 flex gap-2" data-astro-cid-gyrmc7w2> <input type="text" id="chat-input" placeholder="Describe what you want to analyze..." class="flex-1 bg-transparent px-3 py-2 text-sm border border-border rounded-md
                      focus:outline-none focus:border-accent" data-astro-cid-gyrmc7w2> <button id="chat-send" class="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm font-medium
                       hover:opacity-90 transition-opacity disabled:opacity-50" data-astro-cid-gyrmc7w2>
Send
</button> </div> </div> </main> ` })} ${renderScript($$result, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/upload.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/upload.astro", void 0);

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/upload.astro";
const $$url = "/upload";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Upload,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
