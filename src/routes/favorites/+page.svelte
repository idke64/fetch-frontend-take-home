<script>
  import { DogCard } from "$lib";
  import { favoriteBreeds } from "$lib";
</script>

<section class="page-container">
  <div class="flex flex-col gap-y-8">
    <div class="flex flex-col gap-y-2 items-center justify-center w-full">
      <h2 class="font-bold text-2xl">Favorites Gallery</h2>
    </div>

    {#if $favoriteBreeds.length > 0}
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {#each $favoriteBreeds as breedId (breedId)}
          <DogCard {breedId} />
        {/each}
      </div>
    {:else}
      <div class="w-full flex items-center justify-center">
        <span>You do not have any favorite breeds.</span>
      </div>
    {/if}
  </div>
</section>
