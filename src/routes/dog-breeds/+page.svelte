<script>
  // Import necessary components and stores
  import { DogAccordion } from "$lib"; // Accordion component for displaying breeds and sub-breeds
  import { favoriteBreeds } from "$lib"; // Store to track favorite breeds
  export let data; // The data containing breeds and sub-breeds is passed as a prop

  // Map the breed data into a more usable format for the list
  const breeds = Object.entries(data.breeds).map(([key, value]) => ({
    breed: key,
    subBreeds: value,
  }));

  let searchQuery = ""; // Search query for filtering breeds based on user input
  let filteredBreeds; // The list of breeds filtered by the search query and filters
  let showHasSubBreeds = false; // Toggle for displaying only breeds with sub-breeds
  let showFavorited = false; // Toggle for displaying only favorited breeds

  // Filter breeds based on search query, "has sub-breeds", and "favorited" toggles
  $: {
    filteredBreeds = breeds.filter(({ breed, subBreeds }) => {
      // Check if the breed or any of its sub-breeds is favorited
      const isFavorited =
        subBreeds.some((subBreed) =>
          $favoriteBreeds.includes(`${breed}/${subBreed}`)
        ) || $favoriteBreeds.includes(breed);

      // Check if the breed has sub-breeds
      const hasSubBreeds = subBreeds.length > 0;

      // Apply filtering logic based on whether the user wants to see favorited and/or breeds with sub-breeds
      const matchesFavorited = showFavorited ? isFavorited : true;
      const matchesHasSubBreeds = showHasSubBreeds ? hasSubBreeds : true;

      // Return true if the breed matches all filters and the search query
      if (matchesFavorited && matchesHasSubBreeds) {
        return (
          breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subBreeds.some((subBreed) =>
            subBreed.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }

      return false;
    });
  }
</script>

<!-- Page layout for displaying dog breeds and filters -->
<section class="page-container">
  <div class="flex flex-col gap-y-8">
    <!-- Header with title and description -->
    <div class="flex flex-col gap-y-2 items-center justify-center w-full">
      <h2 class="font-bold text-2xl">Dog Breeds</h2>
      <p class="text-neutral-800 text-center">
        Add your favorite dog breeds and sub-breeds by browsing and selecting
        the ones you love!
      </p>
    </div>

    <!-- Search bar and filter buttons -->
    <div class="flex max-md:flex-col gap-x-3 gap-y-2 items-center w-full">
      <!-- Search input for filtering breeds by name -->
      <input
        placeholder="Search"
        type="text"
        class="border h-10 rounded w-full px-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
        bind:value={searchQuery}
      />

      <!-- Filter buttons: Has Sub-Breeds and Favorited -->
      <div class="flex gap-x-3 h-full max-md:w-full justify-start">
        <!-- Toggle for displaying only breeds with sub-breeds -->
        <button
          on:click={() => (showHasSubBreeds = !showHasSubBreeds)}
          class={`rounded border h-10 px-4 whitespace-nowrap overflow-visible font-semibold duration-200 text-sm ${showHasSubBreeds ? "bg-blue-50 border-blue-400 text-blue-500" : "bg-white hover:bg-neutral-100"}`}
        >
          Has Sub-Breeds
        </button>

        <!-- Toggle for displaying only favorited breeds -->
        <button
          on:click={() => (showFavorited = !showFavorited)}
          class={`rounded border h-10 px-4 whitespace-nowrap overflow-visible font-semibold duration-200 text-sm ${showFavorited ? "bg-blue-50 border-blue-400 text-blue-500" : "bg-white hover:bg-neutral-100"}`}
        >
          Favorited
        </button>
      </div>
    </div>

    <!-- Single-column layout for small screens -->
    <div class="grid grid-cols-1 gap-y-4 md:hidden">
      {#each filteredBreeds as entry}
        <DogAccordion breed={entry.breed} subBreeds={entry.subBreeds} />
      {/each}
    </div>

    <!-- Two-column layout for medium and larger screens -->
    <div class="hidden md:grid grid-cols-2 gap-4">
      <!-- Left column: every second breed (i % 2 == 0) -->
      <div class="grid grid-cols-1 gap-y-4 self-start">
        {#each filteredBreeds as entry, i}
          {#if i % 2 == 0}
            <DogAccordion breed={entry.breed} subBreeds={entry.subBreeds} />
          {/if}
        {/each}
      </div>

      <!-- Right column: every other breed (i % 2 == 1) -->
      <div class="grid grid-cols-1 gap-y-4 self-start">
        {#each filteredBreeds as entry, i}
          {#if i % 2 == 1}
            <DogAccordion breed={entry.breed} subBreeds={entry.subBreeds} />
          {/if}
        {/each}
      </div>
    </div>
  </div>
</section>
