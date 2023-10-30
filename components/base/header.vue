<template>
    <div class="absolute w-full">
        <UContainer class="py-4">
            <div class="flex justify-between text-xl">
                <nuxt-link class="font-heading" to="/">Accueil</nuxt-link>
                <nuxt-link class="font-heading" to="/upload">Créer</nuxt-link>
            </div>
        </UContainer>
    </div>
</template>

<script>
export default {
    name: `GlobalHeader`,
};
</script>
