<script>
  // Import FontAwesome icons for heart (favorite) and chevron (expand/collapse)
  import { faHeart } from "@fortawesome/free-regular-svg-icons";
  import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
  import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
  import { onMount, afterUpdate } from "svelte"; // Import lifecycle functions
  import Fa from "svelte-fa"; // FontAwesome component
  import { favoriteBreeds } from "$lib"; // Import the store for favorite breeds

  // Props for breed and sub-breeds
  export let breed;
  export let subBreeds = Array(0); // Default to an empty array if subBreeds are not provided

  // Variables to track if the breed and sub-breeds are favorited
  let breedFavorited = false;
  let subBreedsFavorited = Array(subBreeds.length).fill(false);
  let expanded = false; // Controls accordion expansion state
  let content; // Reference to the accordion content element
  let contentHeight = 0; // Tracks content height for accordion
  let loading = true; // Tracks the loading state for data

  // Capitalizes the first letter of a string (used for breed and sub-breed names)
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Calculates and updates the height of the accordion content
  const getContentHeight = () => {
    if (content) {
      contentHeight = content.scrollHeight;
    }
  };

  // Updates the favorite status for the breed and its sub-breeds
  const updateFavoritedStatus = () => {
    breedFavorited = $favoriteBreeds.includes(breed);
    subBreedsFavorited = subBreeds.map((subBreed) =>
      $favoriteBreeds.includes(`${breed}/${subBreed}`)
    );
  };

  // Handles toggling the favorite status for a specific sub-breed
  const handleFavoriteSubBreed = (subBreed) => {
    favoriteBreeds.update((currentBreeds) => {
      return currentBreeds.includes(`${breed}/${subBreed}`)
        ? currentBreeds.filter(
            (currentBreed) => currentBreed !== `${breed}/${subBreed}`
          )
        : currentBreeds.concat(`${breed}/${subBreed}`);
    });
    updateFavoritedStatus(); // Update the status after modifying favorites
  };

  // Handles toggling the favorite status for the main breed
  const handleFavoriteBreed = () => {
    favoriteBreeds.update((currentBreeds) => {
      return currentBreeds.includes(breed)
        ? currentBreeds.filter((currentBreed) => currentBreed !== breed)
        : currentBreeds.concat([breed]);
    });
    updateFavoritedStatus(); // Update the status after modifying favorites
  };

  // Update content height and favorite status after the DOM is updated
  afterUpdate(() => {
    getContentHeight();
    updateFavoritedStatus();
  });

  // Initial setup when the component mounts
  onMount(() => {
    getContentHeight();
    updateFavoritedStatus();
    expanded = breedFavorited || subBreedsFavorited.includes(true); // Expand if any are favorited
    loading = false; // Set loading to false once data is ready
  });

  // Calculate the total number of favorited items (breed and sub-breeds)
  $: favoritedCount =
    subBreedsFavorited.filter(Boolean).length + breedFavorited;
</script>

<!-- Accordion container for breed and sub-breeds -->
<div class="w-full border rounded flex flex-col overflow-hidden">
  <!-- Accordion header (click to expand/collapse) -->
  <button
    on:click={() => (expanded = !expanded)}
    class={`flex w-full justify-between p-4 ${expanded ? "bg-neutral-100" : "bg-white"}`}
  >
    <div class="flex gap-x-2 items-start">
      <div class="flex flex-col items-start">
        <!-- Render either a pulsing loading skeleton or the actual content based on loading state -->
        {#if loading}
          <!-- Pulsing effect for breed name and sub-breed count while loading -->
          <div class="h-6 animate-pulse w-60 bg-gray-300" />
          <div class="h-3 animate-pulse w-20 bg-gray-300 my-0.5" />
        {:else}
          <!-- Render the breed name and sub-breed count once loading is complete -->
          <div class="flex gap-x-1 items-center">
            <span class="font-semibold text-lg">{capitalize(breed)}</span>
            <span>
              ({subBreeds.length == 0 ? "No" : subBreeds.length} Sub-Breed{subBreeds.length !==
              1
                ? "s"
                : ""})
            </span>
          </div>
          <!-- Display the number of favorited items -->
          <span class="text-xs self-start text-neutral-600">
            {favoritedCount} Favorited
          </span>
        {/if}
      </div>
    </div>
    <!-- Chevron icon to indicate expand/collapse -->
    <div
      class={`self-center duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
    >
      <Fa icon={faChevronDown} />
    </div>
  </button>

  <!-- Accordion content (sub-breeds and favorite buttons) -->
  <div
    bind:this={content}
    class="overflow-hidden duration-300 max-h-0"
    style={`max-height: ${expanded ? contentHeight + 40 : "0"}px;`}
  >
    <hr />
    <div class="flex flex-col">
      <!-- Favorite button for the main breed -->
      <div class="p-4 flex gap-x-2">
        <button on:click={handleFavoriteBreed} class="icon-btn self-start">
          <Fa
            class="text-red-600"
            size="1.1x"
            icon={breedFavorited ? faHeartFilled : faHeart}
          />
        </button>
        <span>{capitalize(breed)}</span>
      </div>

      <!-- Sub-breeds list with favorite buttons for each sub-breed -->
      {#if subBreeds.length != 0}
        <hr />
        <div class="p-4 flex flex-col gap-y-4">
          <span class="font-medium">Sub-Breeds</span>
          <div class="grid grid-cols-1 gap-y-3">
            {#each subBreeds as subBreed, i}
              <div class="flex gap-x-2">
                <!-- Favorite button for each sub-breed -->
                <button
                  on:click={() => handleFavoriteSubBreed(subBreed)}
                  class="icon-btn"
                >
                  <Fa
                    class="text-red-600"
                    size="1.1x"
                    icon={subBreedsFavorited[i] ? faHeartFilled : faHeart}
                  />
                </button>
                <span>{capitalize(subBreed)}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
