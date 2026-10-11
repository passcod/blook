// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="intro.html"><strong aria-hidden="true">1.</strong> Introduction</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="avatars/index.html"><strong aria-hidden="true">1.1.</strong> Avatars</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="info/trademark.html"><strong aria-hidden="true">1.2.</strong> Trademark</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">2.</strong> Blog</span><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/rp-extio.html"><strong aria-hidden="true">2.1.</strong> 2026 | Turn your devboard into an embedded peripheral explorer for Linux</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/ai-log.html"><strong aria-hidden="true">2.2.</strong> 2025 | AI Log</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/g7-7700-nouveau.html"><strong aria-hidden="true">2.3.</strong> 2024 | Nouveau on Dell G7 7700</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/caddy.html"><strong aria-hidden="true">2.4.</strong> 2023 | Caddy</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/starlink.html"><strong aria-hidden="true">2.5.</strong> 2023 | IPv6 on Mikrotik on Starlink</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/just-a-bit-of-wasi.html"><strong aria-hidden="true">2.6.</strong> 2022 | Just a bit of wasi</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/rust-crimes-enum-ints.html"><strong aria-hidden="true">2.7.</strong> 2021 | Rust crimes: Enum ints</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/exploring-wasm.html"><strong aria-hidden="true">2.8.</strong> 2020 | Exploration of Wasm</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/async-generator-state-machine.html"><strong aria-hidden="true">2.9.</strong> 2018 | A little elegant state machine with Async Generators</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="musings/gaston-lagaffe/index.html"><strong aria-hidden="true">2.10.</strong> 2016 | Gaston Lagaffe as a model for youths</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="recipes/index.html"><strong aria-hidden="true">3.</strong> Recipes</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="recipes/thermomix/dairy-cream.html"><strong aria-hidden="true">3.1.</strong> No-effort Dairy Cream</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="recipes/thermomix/pasta.html"><strong aria-hidden="true">3.2.</strong> Semi-steamed Pasta</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="reading/index.html"><strong aria-hidden="true">4.</strong> Reading archive</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2016/index.html"><strong aria-hidden="true">4.1.</strong> 2016</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2016/july.html"><strong aria-hidden="true">4.1.1.</strong> July</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2016/december.html"><strong aria-hidden="true">4.1.2.</strong> December</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/index.html"><strong aria-hidden="true">4.2.</strong> 2017</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/january.html"><strong aria-hidden="true">4.2.1.</strong> January</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/february.html"><strong aria-hidden="true">4.2.2.</strong> February</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/march.html"><strong aria-hidden="true">4.2.3.</strong> March</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/april.html"><strong aria-hidden="true">4.2.4.</strong> April</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/may.html"><strong aria-hidden="true">4.2.5.</strong> May</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/june.html"><strong aria-hidden="true">4.2.6.</strong> June</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/july.html"><strong aria-hidden="true">4.2.7.</strong> July</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/august.html"><strong aria-hidden="true">4.2.8.</strong> August</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/september.html"><strong aria-hidden="true">4.2.9.</strong> September</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/october.html"><strong aria-hidden="true">4.2.10.</strong> October</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/november.html"><strong aria-hidden="true">4.2.11.</strong> November</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2017/december.html"><strong aria-hidden="true">4.2.12.</strong> December</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/index.html"><strong aria-hidden="true">4.3.</strong> 2018</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/january.html"><strong aria-hidden="true">4.3.1.</strong> January</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/february.html"><strong aria-hidden="true">4.3.2.</strong> February</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/march.html"><strong aria-hidden="true">4.3.3.</strong> March</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/april.html"><strong aria-hidden="true">4.3.4.</strong> April</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/may.html"><strong aria-hidden="true">4.3.5.</strong> May</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/june.html"><strong aria-hidden="true">4.3.6.</strong> June</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/july.html"><strong aria-hidden="true">4.3.7.</strong> July</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/august.html"><strong aria-hidden="true">4.3.8.</strong> August</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/september.html"><strong aria-hidden="true">4.3.9.</strong> September</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/october.html"><strong aria-hidden="true">4.3.10.</strong> October</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/november.html"><strong aria-hidden="true">4.3.11.</strong> November</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2018/december.html"><strong aria-hidden="true">4.3.12.</strong> December</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/index.html"><strong aria-hidden="true">4.4.</strong> 2019</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/january.html"><strong aria-hidden="true">4.4.1.</strong> January</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/february.html"><strong aria-hidden="true">4.4.2.</strong> February</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/march.html"><strong aria-hidden="true">4.4.3.</strong> March</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/april.html"><strong aria-hidden="true">4.4.4.</strong> April</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/may.html"><strong aria-hidden="true">4.4.5.</strong> May</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/june.html"><strong aria-hidden="true">4.4.6.</strong> June</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/july.html"><strong aria-hidden="true">4.4.7.</strong> July</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/august.html"><strong aria-hidden="true">4.4.8.</strong> August</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/september.html"><strong aria-hidden="true">4.4.9.</strong> September</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/october.html"><strong aria-hidden="true">4.4.10.</strong> October</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/november.html"><strong aria-hidden="true">4.4.11.</strong> November</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2019/december.html"><strong aria-hidden="true">4.4.12.</strong> December</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2020/index.html"><strong aria-hidden="true">4.5.</strong> 2020</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2020/january.html"><strong aria-hidden="true">4.5.1.</strong> January</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2020/february.html"><strong aria-hidden="true">4.5.2.</strong> February</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2020/march-june.html"><strong aria-hidden="true">4.5.3.</strong> March—June</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2020/july.html"><strong aria-hidden="true">4.5.4.</strong> July</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2020/august-december.html"><strong aria-hidden="true">4.5.5.</strong> August—December</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2021/index.html"><strong aria-hidden="true">4.6.</strong> 2021</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2021/january-may.html"><strong aria-hidden="true">4.6.1.</strong> First semester</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2021/june-november.html"><strong aria-hidden="true">4.6.2.</strong> Second semester</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2022/index.html"><strong aria-hidden="true">4.7.</strong> 2022</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2023/index.html"><strong aria-hidden="true">4.8.</strong> 2023</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2024/index.html"><strong aria-hidden="true">4.9.</strong> 2024</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="reading/2025/index.html"><strong aria-hidden="true">4.10.</strong> 2025</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="deprecated/index.html"><strong aria-hidden="true">5.</strong> Deprecated content</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/blanket.html"><strong aria-hidden="true">5.1.</strong> Blanket license</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="info/keys.html"><strong aria-hidden="true">5.2.</strong> Cryptographic keys</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">5.3.</strong> Outdated</span><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/no-time-for-chrono.html"><strong aria-hidden="true">5.3.1.</strong> No Time for Chrono</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/dhall-review.html"><strong aria-hidden="true">5.3.2.</strong> Dhall: not quite it</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/outdated/modern-systems-languages.html"><strong aria-hidden="true">5.3.3.</strong> Modern systems languages</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/outdated/soft-limits-meaningful-cuts.html"><strong aria-hidden="true">5.3.4.</strong> Soft limits and meaningful content cuts</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/outdated/bruteforcing-the-devil.html"><strong aria-hidden="true">5.3.5.</strong> Bruteforcing the Devil</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/outdated/lighting-up-rust-with-neon.html"><strong aria-hidden="true">5.3.6.</strong> Lighting up Rust with Neon</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">5.4.</strong> Unheld</span><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/unheld/a-thought-on-fanfiction.html"><strong aria-hidden="true">5.4.1.</strong> A thought on fanfiction</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">5.4.2.</strong> Identity</span><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/unheld/not-coming.html"><strong aria-hidden="true">5.4.2.1.</strong> This is not a coming out</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/unheld/guy-adjacent.html"><strong aria-hidden="true">5.4.2.2.</strong> Guy-Adjacent</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/unheld/my-words.html"><strong aria-hidden="true">5.4.2.3.</strong> My Words</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/unheld/check-labels.html"><strong aria-hidden="true">5.4.2.4.</strong> Check all applicable labels</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="musings/ai.html"><strong aria-hidden="true">5.4.3.</strong> On generative AI for programming Rust</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/index.html"><strong aria-hidden="true">5.5.</strong> Fiction</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/index.html"><strong aria-hidden="true">5.5.1.</strong> Poetry</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/only-one-left.html"><strong aria-hidden="true">5.5.1.1.</strong> Only One Left</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/mid-loss.html"><strong aria-hidden="true">5.5.1.2.</strong> Mid-loss</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/aftermath.html"><strong aria-hidden="true">5.5.1.3.</strong> Aftermath</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/one-and-two.html"><strong aria-hidden="true">5.5.1.4.</strong> one and two</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/grow.html"><strong aria-hidden="true">5.5.1.5.</strong> Grow</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/slowly.html"><strong aria-hidden="true">5.5.1.6.</strong> Slowly</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/alya.html"><strong aria-hidden="true">5.5.1.7.</strong> Alya</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/so-many-alone-at-night.html"><strong aria-hidden="true">5.5.1.8.</strong> so many alone at night</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/up-up-and-away.html"><strong aria-hidden="true">5.5.1.9.</strong> Up Up And Away</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/sleep.html"><strong aria-hidden="true">5.5.1.10.</strong> Sleep</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/hold.html"><strong aria-hidden="true">5.5.1.11.</strong> Hold</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="deprecated/unheld/sidebar.html"><strong aria-hidden="true">5.5.1.12.</strong> SIDEBAR</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/sorry.html"><strong aria-hidden="true">5.5.1.13.</strong> Sorry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/right-over-there.html"><strong aria-hidden="true">5.5.1.14.</strong> Right over there</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/the-road-to-hell.html"><strong aria-hidden="true">5.5.1.15.</strong> The Road to Hell</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/self.html"><strong aria-hidden="true">5.5.1.16.</strong> Self</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/tree.html"><strong aria-hidden="true">5.5.1.17.</strong> Tree</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/unlit.html"><strong aria-hidden="true">5.5.1.18.</strong> Unlit</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/one-summer-morning.html"><strong aria-hidden="true">5.5.1.19.</strong> One summer morning</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/poetry/smile.html"><strong aria-hidden="true">5.5.1.20.</strong> Smile</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/shorts/index.html"><strong aria-hidden="true">5.5.2.</strong> Short Prose</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/shorts/the-box.html"><strong aria-hidden="true">5.5.2.1.</strong> The Box</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/shorts/a-man.html"><strong aria-hidden="true">5.5.2.2.</strong> A Man</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/shorts/alive-in-the-night.html"><strong aria-hidden="true">5.5.2.3.</strong> ali.vei.nth.eni.ght</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/shorts/regulus.html"><strong aria-hidden="true">5.5.2.4.</strong> Regulus</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/shorts/regulus-notes.html"><strong aria-hidden="true">5.5.2.4.1.</strong> (notes for) Regulus</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/shorts/my-mountain-of-knowledge.html"><strong aria-hidden="true">5.5.2.5.</strong> My mountain of Knowledge</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="fiction/shorts/finally-i-knew.html"><strong aria-hidden="true">5.5.2.6.</strong> Finally, I knew</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/index.html"><strong aria-hidden="true">5.6.</strong> Progress updates</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><span><strong aria-hidden="true">5.6.1.</strong> Topic-wise</span><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/accord.html"><strong aria-hidden="true">5.6.1.1.</strong> Accord</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="technical/agile/index.html"><strong aria-hidden="true">5.6.1.2.</strong> AGILE</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/armstrong.html"><strong aria-hidden="true">5.6.1.3.</strong> Armstrong</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/caretaker.html"><strong aria-hidden="true">5.6.1.4.</strong> Caretaker</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/car-rainbow.html"><strong aria-hidden="true">5.6.1.5.</strong> Car Rainbow</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/certainly.html"><strong aria-hidden="true">5.6.1.6.</strong> Certainly</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/ct.html"><strong aria-hidden="true">5.6.1.7.</strong> ct</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/defnew.html"><strong aria-hidden="true">5.6.1.8.</strong> defnew</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/eqsky.html"><strong aria-hidden="true">5.6.1.9.</strong> Earthquake Sky</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/figleaf.html"><strong aria-hidden="true">5.6.1.10.</strong> Figleaf</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/glass-hanger.html"><strong aria-hidden="true">5.6.1.11.</strong> Glass Hanger</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/entry-insert.html"><strong aria-hidden="true">5.6.1.12.</strong> Hashmap Entry Insert</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/intpath.html"><strong aria-hidden="true">5.6.1.13.</strong> IntPath</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/irish.html"><strong aria-hidden="true">5.6.1.14.</strong> Irish</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/japanese.html"><strong aria-hidden="true">5.6.1.15.</strong> Japanese</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/keycasting.html"><strong aria-hidden="true">5.6.1.16.</strong> Keycasting</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/lah-kara.html"><strong aria-hidden="true">5.6.1.17.</strong> Lah Kara</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/mead.html"><strong aria-hidden="true">5.6.1.18.</strong> Mead</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/notify.html"><strong aria-hidden="true">5.6.1.19.</strong> Notify</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/omelette.html"><strong aria-hidden="true">5.6.1.20.</strong> Omelette</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/pinn.html"><strong aria-hidden="true">5.6.1.21.</strong> Pinn</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/reasonable.html"><strong aria-hidden="true">5.6.1.22.</strong> Reasonable</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/reupholstery.html"><strong aria-hidden="true">5.6.1.23.</strong> Reupholstering chairs</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/sassbot.html"><strong aria-hidden="true">5.6.1.24.</strong> Sassbot</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/spanish.html"><strong aria-hidden="true">5.6.1.25.</strong> Spanish</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/splash.html"><strong aria-hidden="true">5.6.1.26.</strong> Splash</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/storq.html"><strong aria-hidden="true">5.6.1.27.</strong> Storq</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/super.html"><strong aria-hidden="true">5.6.1.28.</strong> Super</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/swp.html"><strong aria-hidden="true">5.6.1.29.</strong> Swp</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/trebuchet.html"><strong aria-hidden="true">5.6.1.30.</strong> Trebuchet</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/cargo-watchexec.html"><strong aria-hidden="true">5.6.1.31.</strong> Watchexec</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/what.html"><strong aria-hidden="true">5.6.1.32.</strong> What</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/projects/zarc.html"><strong aria-hidden="true">5.6.1.33.</strong> Zarc</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/index.html"><strong aria-hidden="true">5.6.2.</strong> 2017-2019 (mostly) regular micro updates</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2016.html"><strong aria-hidden="true">5.6.2.1.</strong> 2016</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/index.html"><strong aria-hidden="true">5.6.2.2.</strong> 2017</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/january.html"><strong aria-hidden="true">5.6.2.2.1.</strong> January</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/february.html"><strong aria-hidden="true">5.6.2.2.2.</strong> February</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/march.html"><strong aria-hidden="true">5.6.2.2.3.</strong> March</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/april.html"><strong aria-hidden="true">5.6.2.2.4.</strong> April</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/may.html"><strong aria-hidden="true">5.6.2.2.5.</strong> May</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/june.html"><strong aria-hidden="true">5.6.2.2.6.</strong> June</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/july.html"><strong aria-hidden="true">5.6.2.2.7.</strong> July</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/august.html"><strong aria-hidden="true">5.6.2.2.8.</strong> August</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/september.html"><strong aria-hidden="true">5.6.2.2.9.</strong> September</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/october.html"><strong aria-hidden="true">5.6.2.2.10.</strong> October</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/november.html"><strong aria-hidden="true">5.6.2.2.11.</strong> November</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2017/december.html"><strong aria-hidden="true">5.6.2.2.12.</strong> December</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2018/index.html"><strong aria-hidden="true">5.6.2.3.</strong> 2018</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2018/january.html"><strong aria-hidden="true">5.6.2.3.1.</strong> January</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2018/march.html"><strong aria-hidden="true">5.6.2.3.2.</strong> March</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2018/april.html"><strong aria-hidden="true">5.6.2.3.3.</strong> April</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2018/may.html"><strong aria-hidden="true">5.6.2.3.4.</strong> May</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2018/september.html"><strong aria-hidden="true">5.6.2.3.5.</strong> September</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2018/november.html"><strong aria-hidden="true">5.6.2.3.6.</strong> November</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2018/december.html"><strong aria-hidden="true">5.6.2.3.7.</strong> December</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2019/index.html"><strong aria-hidden="true">5.6.2.4.</strong> 2019</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2019/january.html"><strong aria-hidden="true">5.6.2.4.1.</strong> January</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2019/february.html"><strong aria-hidden="true">5.6.2.4.2.</strong> February</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2019/march.html"><strong aria-hidden="true">5.6.2.4.3.</strong> March</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2019/april.html"><strong aria-hidden="true">5.6.2.4.4.</strong> April</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2019/september.html"><strong aria-hidden="true">5.6.2.4.5.</strong> September</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="updates/dated/2019/december.html"><strong aria-hidden="true">5.6.2.4.6.</strong> December</a></span></li></ol></li></ol></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            // Check both with and without the '.html' suffix to be robust against pretty URLs
            if (link.href.replace(/\.html$/, '') === current_page.replace(/\.html$/, '')
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

