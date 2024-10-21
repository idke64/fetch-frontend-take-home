<script>
  import { faHeart } from "@fortawesome/free-regular-svg-icons";
  import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
  import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
  import { onMount, afterUpdate } from "svelte";
  import Fa from "svelte-fa";
  import { favoriteBreeds } from "$lib";

  export let breed;
  export let subBreeds = Array(0);

  let breedFavorited = false;
  let subBreedsFavorited = Array(subBreeds.length).fill(false);
  let expanded = false;
  let content;
  let contentHeight = 0;
  let loading = true;

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const getContentHeight = () => {
    if (content) {
      contentHeight = content.scrollHeight;
    }
  };

  const updateFavoritedStatus = () => {
    breedFavorited = $favoriteBreeds.includes(breed);
    subBreedsFavorited = subBreeds.map((subBreed) =>
      $favoriteBreeds.includes(`${breed}/${subBreed}`)
    );
  };

  const handleFavoriteSubBreed = (subBreed) => {
    favoriteBreeds.update((currentBreeds) => {
      return currentBreeds.includes(`${breed}/${subBreed}`)
        ? currentBreeds.filter(
            (currentBreed) => currentBreed !== `${breed}/${subBreed}`
          )
        : currentBreeds.concat(`${breed}/${subBreed}`);
    });
    updateFavoritedStatus();
  };

  const handleFavoriteBreed = () => {
    favoriteBreeds.update((currentBreeds) => {
      return currentBreeds.includes(breed)
        ? currentBreeds.filter((currentBreed) => currentBreed !== breed)
        : currentBreeds.concat([breed]);
    });
    updateFavoritedStatus();
  };

  afterUpdate(() => {
    getContentHeight();
    updateFavoritedStatus();
  });

  onMount(() => {
    getContentHeight();
    updateFavoritedStatus();
    expanded = breedFavorited || subBreedsFavorited.includes(true);
    loading = false;
  });

  $: favoritedCount =
    subBreedsFavorited.filter(Boolean).length + breedFavorited;
</script>

<div class="w-full border rounded flex flex-col overflow-hidden">
  <button
    on:click={() => (expanded = !expanded)}
    class={`flex w-full justify-between p-4 ${expanded ? "bg-neutral-100" : "bg-white"}`}
  >
    <div class="flex gap-x-2 items-start">
      <div class="flex flex-col items-start">
        {#if loading}
          <div class="h-6 animate-pulse w-60 bg-gray-300" />
          <div class="h-3 animate-pulse w-20 bg-gray-300 my-0.5" />
        {:else}
          <div class="flex gap-x-1 items-center">
            <span class="font-semibold text-lg">{capitalize(breed)}</span>
            <span>
              ({subBreeds.length == 0 ? "No" : subBreeds.length} Sub-Breed{subBreeds.length !==
              1
                ? "s"
                : ""})
            </span>
          </div>
          <span class="text-xs self-start text-neutral-600">
            {favoritedCount} Favorited
          </span>
        {/if}
      </div>
    </div>
    <div
      class={`self-center duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
    >
      <Fa icon={faChevronDown} />
    </div>
  </button>

  <div
    bind:this={content}
    class="overflow-hidden duration-300 max-h-0"
    style={`max-height: ${expanded ? contentHeight + 40 : "0"}px;`}
  >
    <hr />
    <div class="flex flex-col">
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

      {#if subBreeds.length != 0}
        <hr />
        <div class="p-4 flex flex-col gap-y-4">
          <span class="font-medium">Sub-Breeds</span>
          <div class="grid grid-cols-1 gap-y-3">
            {#each subBreeds as subBreed, i}
              <div class="flex gap-x-2">
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
