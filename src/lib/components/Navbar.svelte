<script>
  // Import FontAwesome icons and styles
  import { faDog, faHeart } from "@fortawesome/free-solid-svg-icons";
  import "../../app.css";
  import Fa from "svelte-fa"; // FontAwesome component for Svelte
</script>

<!-- Navigation bar container -->
<nav class="w-full py-4 border-b">
  <div class="flex items-center justify-center h-full gap-x-6">
    <!-- Navigation links with icons -->
    <a class="navlink" href="/"><Fa icon={faDog} />Dog Breeds</a>
    <a class="navlink" href="/favorites"><Fa icon={faHeart} />Favorites</a>
  </div>
</nav>
