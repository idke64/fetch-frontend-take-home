<script>
  // Import DogCard component to display individual breed cards
  import { DogCard } from "$lib";
  // Import favoriteBreeds store, which keeps track of favorited breeds
  import { favoriteBreeds } from "$lib";
</script>

<!-- Main section for the Favorites Gallery -->
<section class="page-container">
  <div class="flex flex-col gap-y-8">
    <!-- Header with title for the favorites gallery -->
    <div class="flex flex-col gap-y-2 items-center justify-center w-full">
      <h2 class="font-bold text-2xl">Favorites Gallery</h2>
    </div>

    <!-- Check if there are any favorite breeds stored in the favoriteBreeds store -->
    {#if $favoriteBreeds.length > 0}
      <!-- Grid layout for displaying the favorite dog breeds -->
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {#each $favoriteBreeds as breedId (breedId)}
          <!-- Render DogCard component for each favorited breedId -->
          <DogCard {breedId} />
        {/each}
      </div>
    {:else}
      <!-- If there are no favorite breeds, display a message -->
      <div class="w-full flex items-center justify-center">
        <span>You do not have any favorite breeds.</span>
      </div>
    {/if}
  </div>
</section>
