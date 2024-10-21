<script>
  import { DogAccordion } from "$lib";
  import { favoriteBreeds } from "$lib";
  export let data;

  const breeds = Object.entries(data.breeds).map(([key, value]) => ({
    breed: key,
    subBreeds: value,
  }));

  let searchQuery = "";
  let filteredBreeds;
  let showHasSubBreeds = false;
  let showFavorited = false;

  $: {
    filteredBreeds = breeds.filter(({ breed, subBreeds }) => {
      const isFavorited =
        subBreeds.some((subBreed) =>
          $favoriteBreeds.includes(`${breed}/${subBreed}`)
        ) || $favoriteBreeds.includes(breed);

      const hasSubBreeds = subBreeds.length > 0;

      const matchesFavorited = showFavorited ? isFavorited : true;
      const matchesHasSubBreeds = showHasSubBreeds ? hasSubBreeds : true;

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

<section class="page-container">
  <div class="flex flex-col gap-y-8">
    <div class="flex flex-col gap-y-2 items-center justify-center w-full">
      <h2 class="font-bold text-2xl">Dog Breeds</h2>
      <p class="text-neutral-800 text-center">
        Add your favorite dog breeds and sub-breeds by browsing and selecting
        the ones you love!
      </p>
    </div>

    <div class="flex max-md:flex-col gap-x-3 gap-y-2 items-center w-full">
      <input
        placeholder="Search"
        type="text"
        class="border h-10 rounded w-full px-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
        bind:value={searchQuery}
      />

      <div class="flex gap-x-3 h-full max-md:w-full justify-start">
        <button
          on:click={() => (showHasSubBreeds = !showHasSubBreeds)}
          class={`rounded border h-10 px-4 whitespace-nowrap overflow-visible font-semibold duration-200 text-sm ${showHasSubBreeds ? "bg-blue-50 border-blue-400 text-blue-500" : "bg-white hover:bg-neutral-100"}`}
        >
          Has Sub-Breeds
        </button>

        <button
          on:click={() => (showFavorited = !showFavorited)}
          class={`rounded border h-10 px-4 whitespace-nowrap overflow-visible font-semibold duration-200 text-sm ${showFavorited ? "bg-blue-50 border-blue-400 text-blue-500" : "bg-white hover:bg-neutral-100"}`}
        >
          Favorited
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-y-4 md:hidden">
      {#each filteredBreeds as entry}
        <DogAccordion breed={entry.breed} subBreeds={entry.subBreeds} />
      {/each}
    </div>

    <div class="hidden md:grid grid-cols-2 gap-4">
      <div class="grid grid-cols-1 gap-y-4 self-start">
        {#each filteredBreeds as entry, i}
          {#if i % 2 == 0}
            <DogAccordion breed={entry.breed} subBreeds={entry.subBreeds} />
          {/if}
        {/each}
      </div>

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
