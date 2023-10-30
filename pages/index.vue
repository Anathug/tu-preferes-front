<template>
    <UContainer class="h-screen flex flex-col gap-8 justify-center items-center">
        <div class="flex flex-col gap-6 items-center" v-if="step === 1">
            <h3 class="font-heading text-6xl">Choisir la difficulté</h3>
            <p class="font-heading text-5xl text-center">{{ level }}</p>
            <URange v-model="level" :min="1" :max="5" :step="1" />
            <UButton @click="onNextButtonClick" size="xl">Suivant</UButton>
        </div>
        <div v-if="step === 2">
            <UButton
                @click="onBackButtonClick"
                icon="i-heroicons-arrow-small-left-solid"
                color="primary"
                label="Back"
                :trailing="false"
            />
        </div>
        <div v-if="sentences[0]">
            <div v-if="type === 'prefere'">
                Tu préfères {{ sentences[0].attributes.text.toLowerCase() }} ou
                {{ sentences[1].attributes.text.toLowerCase() }}
            </div>
            <div v-if="type === 'pour'">
                Pour pouvoir {{ sentences[0].attributes.text.toLowerCase() }} est-ce que tu
                {{ sentences[1].attributes.text.toLowerCase() }}
            </div>
        </div>
        <UButton v-if="step === 2" @click="onShuffleButtonClick" class="text-2xl px-6 py-4 font-heading text-white"
            >Tu préferes ?</UButton
        >
    </UContainer>
</template>

<script>
export default {
    name: `PageIndex`,
    async setup() {
        const runtimeConfig = useRuntimeConfig();
        const step = ref(1);
        const level = ref(1);
        const type = ref(``);
        const sentences = ref([``, ``]);

        const goodQuestions = ref([]);
        const badQuestions = ref([]);

        const fetchQuestions = async () => {
            const { data: questionsData } = await useFetch(
                `${runtimeConfig.public.API_URL}/api/questions?filters[level][$eq]=${level.value}`,
                {
                    method: `get`,
                }
            );

            goodQuestions.value = questionsData.value.data.filter((question) => question.attributes.type === `good`);
            badQuestions.value = questionsData.value.data.filter((question) => question.attributes.type === `bad`);
        };

        const onShuffleButtonClick = async () => {
            type.value = Math.random() < 0.5 ? `prefere` : `pour`;

            if (type.value === `prefere`) {
                sentences.value[0] = goodQuestions.value[Math.round(Math.random() * (goodQuestions.value.length - 1))];
                sentences.value[1] = badQuestions.value[Math.round(Math.random() * (badQuestions.value.length - 1))];
            }

            if (type.value === `pour`) {
                const good = Math.random() < 0.5;
                const questions = good ? goodQuestions : badQuestions;

                const randIndex1 = Math.round(Math.random() * (questions.value.length - 1));
                const randIndex2 = Math.round(Math.random() * (questions.value.length - 1));

                sentences.value[0] = questions.value[randIndex1];
                sentences.value[1] = questions.value[randIndex2];
            }
        };

        const onBackButtonClick = async () => {
            step.value = 1;
        };

        const onNextButtonClick = async () => {
            step.value = 2;

            await fetchQuestions();
        };

        return {
            onShuffleButtonClick,
            onBackButtonClick,
            onNextButtonClick,
            level,
            step,
            sentences,
            type,
        };
    },
};
</script>
