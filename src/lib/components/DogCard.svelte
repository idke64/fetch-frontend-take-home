<script>
  import {
    faArrowsRotate,
    faHeart,
    faHeartBroken,
  } from "@fortawesome/free-solid-svg-icons";
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  import { favoriteBreeds } from "$lib";

  let hoveringHeart = false;

  export let breedId;

  let hasSubBreed = breedId.includes("/");

  const formatBreedName = (name) => {
    const exceptions = [
      "terrier",
      "spaniel",
      "shepherd",
      "retriever",
      "setter",
      "hound",
      "pointer",
      "mastiff",
      "spitz",
    ];

    const slashIndex = name.indexOf("/");

    if (hasSubBreed) {
      const breed = name.slice(0, slashIndex);
      const subBreed = name.slice(slashIndex + 1);

      if (exceptions.includes(breed.toLowerCase())) {
        return (
          subBreed.charAt(0).toUpperCase() +
          subBreed.slice(1) +
          " " +
          breed.charAt(0).toUpperCase() +
          breed.slice(1)
        );
      } else {
        return (
          breed.charAt(0).toUpperCase() +
          breed.slice(1) +
          " " +
          subBreed.charAt(0).toUpperCase() +
          subBreed.slice(1)
        );
      }
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  let breedName = formatBreedName(breedId);
  let imageUrl = "";
  let loading = false;

  const fetchImage = async () => {
    loading = true;
    let apiUrl = `https://dog.ceo/api/breed/${breedId}/images/random`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch dog breed image");
      }

      const data = await response.json();
      imageUrl = data.message;
    } catch (error) {
      console.error(error.message);
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    fetchImage();
  });

  const handleUnfavoriteBreed = () => {
    favoriteBreeds.update((currentBreeds) => {
      return currentBreeds.filter((currentBreed) => currentBreed !== breedId);
    });
  };
</script>

<div
  class="w-full p-4 hover:border-opacity-100 border-[#dedede] border-opacity-0 border rounded hover:scale-110 duration-300"
>
  <div class="flex flex-col gap-y-2">
    <div class="rounded overflow-hidden w-full aspect-square">
      {#if loading || imageUrl == ""}
        <div class="w-full h-full bg-gray-300 animate-pulse"></div>
      {:else}
        <img
          loading="lazy"
          class="w-full h-full object-cover"
          src={imageUrl}
          alt="dog"
        />
      {/if}
    </div>

    <div class="flex justify-between">
      <div class="flex flex-col">
        <div class="flex gap-x-1">
          <span class="font-semibold text-lg">{breedName}</span>
          <button
            class="icon-btn self-start"
            on:mouseenter={() => (hoveringHeart = true)}
            on:mouseleave={() => (hoveringHeart = false)}
            on:click={handleUnfavoriteBreed}
          >
            <Fa
              class="text-red-600"
              size="1.1x"
              icon={hoveringHeart ? faHeartBroken : faHeart}
            />
          </button>
        </div>

        <span class="text-xs self-start text-neutral-600">
          Breed: {hasSubBreed
            ? breedName.slice(0, breedName.indexOf(" "))
            : breedName}
        </span>
        <span class="text-xs self-start text-neutral-600">
          Sub-Breed: {hasSubBreed
            ? breedName.slice(breedName.indexOf(" "), breedName.length)
            : "N/A"}
        </span>
      </div>
      <button on:click={fetchImage} class="icon-btn self-start">
        <Fa icon={faArrowsRotate} />
      </button>
    </div>
  </div>
</div>
