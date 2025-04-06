# GraphViz JS

 ## About
  [GraphViz](https://www.graphviz.org/) is open source graph visualization software. Graph visualization is a way of representing structural information as diagrams of abstract graphs and networks. This program serves as a wrapper to the parser available on https://edotor.net/, providing a way to produce valid edotor links from arbitrary data, which are also compressed and handled via [my stateless link shortener](https://github.com/Snail51/Stateless-Link-Shortener).

 ## Installation Instructions
  ### Demo
   **A public demo of this program is available at https://graph.snailien.net**
  ### Usage in HTML
   To use the functionality of this program, include the following scripts and create the corresponding objects.
   ```
    <script src="./uriCompressor-min.js"></script>

    <script type="module" defer>
        import { graph, linker  } from "./graphviz.js";
        window.graph = new graph();
        window.linker = new linker();
    </script>
   ```
  ### Usage over httpx POST
   Not yet implemented.