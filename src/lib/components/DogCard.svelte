<script>
  // Import necessary icons from FontAwesome and Svelte lifecycle function
  import {
    faArrowsRotate,
    faHeart,
    faHeartBroken,
  } from "@fortawesome/free-solid-svg-icons";
  import { onMount } from "svelte";
  import Fa from "svelte-fa"; // FontAwesome component
  import { favoriteBreeds } from "$lib"; // Store for favorite breeds

  let hoveringHeart = false; // Track hover state over heart icon

  export let breedId; // The breed and sub-breed ID passed as a prop

  // Determine if the breed has a sub-breed (based on the presence of '/')
  let hasSubBreed = breedId.includes("/");

  // Function to format breed and sub-breed names for proper display
  const formatBreedName = (name) => {
    // List of breeds that require special formatting
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
      const breed = name.slice(0, slashIndex); // Extract breed
      const subBreed = name.slice(slashIndex + 1); // Extract sub-breed

      // Special formatting for breeds in the exceptions list
      if (exceptions.includes(breed.toLowerCase())) {
        return (
          subBreed.charAt(0).toUpperCase() +
          subBreed.slice(1) +
          " " +
          breed.charAt(0).toUpperCase() +
          breed.slice(1)
        );
      } else {
        // Default breed/sub-breed formatting
        return (
          breed.charAt(0).toUpperCase() +
          breed.slice(1) +
          " " +
          subBreed.charAt(0).toUpperCase() +
          subBreed.slice(1)
        );
      }
    } else {
      // Format breed name if there is no sub-breed
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  let breedName = formatBreedName(breedId); // Formatted breed name for display
  let imageUrl = ""; // Image URL for the breed
  let loading = false; // Track loading state for fetching images

  // Function to fetch a random image for the breed
  const fetchImage = async () => {
    loading = true; // Start loading
    let apiUrl = `https://dog.ceo/api/breed/${breedId}/images/random`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch dog breed image");
      }

      const data = await response.json();
      imageUrl = data.message; // Set the image URL for the breed
    } catch (error) {
      console.error(error.message); // Log any errors
    } finally {
      loading = false; // Stop loading
    }
  };

  // Fetch the image when the component mounts
  onMount(() => {
    fetchImage(); // Call the fetchImage function
  });

  // Handle removing the breed from the favorites list
  const handleUnfavoriteBreed = () => {
    favoriteBreeds.update((currentBreeds) => {
      return currentBreeds.filter((currentBreed) => currentBreed !== breedId); // Remove the breed from favorites
    });
  };
</script>

<!-- Container for displaying the breed info and image -->
<div
  class="w-full p-4 hover:border-opacity-100 border-[#dedede] border-opacity-0 border rounded hover:scale-110 duration-300"
>
  <div class="flex flex-col gap-y-2">
    <!-- Display a skeleton loader or the image based on loading state -->
    <div class="rounded overflow-hidden w-full aspect-square">
      {#if loading || imageUrl == ""}
        <!-- Skeleton loader while the image is loading -->
        <div class="w-full h-full bg-gray-300 animate-pulse"></div>
      {:else}
        <!-- Display the fetched image once loaded -->
        <img
          loading="lazy"
          class="w-full h-full object-cover"
          src={imageUrl}
          alt="dog"
        />
      {/if}
    </div>

    <!-- Display the breed and sub-breed information -->
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div class="flex gap-x-1">
          <!-- Display breed name -->
          <span class="font-semibold text-lg">{breedName}</span>
          <!-- Button to toggle favorite/unfavorite the breed -->
          <button
            class="icon-btn self-start"
            on:mouseenter={() => (hoveringHeart = true)}
            on:mouseleave={() => (hoveringHeart = false)}
            on:click={handleUnfavoriteBreed}
          >
            <!-- Toggle between heart and broken heart icon based on hover -->
            <Fa
              class="text-red-600"
              size="1.1x"
              icon={hoveringHeart ? faHeartBroken : faHeart}
            />
          </button>
        </div>

        <!-- Display whether the breed has a sub-breed or not -->
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
      <!-- Button to refresh the breed image -->
      <button on:click={fetchImage} class="icon-btn self-start">
        <Fa icon={faArrowsRotate} />
      </button>
    </div>
  </div>
</div>
