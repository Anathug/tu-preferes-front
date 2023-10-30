<template>
    <UContainer class="h-screen flex justify-center items-center">
        <div v-if="!hasBeenSubmitted" class="flex flex-col gap-12">
            <h1 class="text-5xl text-center font-heading">Créer ton tu préfères</h1>
            <UForm :state="formState" @submit="onSubmit" class="flex flex-col gap-6">
                <UFormGroup label="Bout de phrase" name="text">
                    <UInput name="text" v-model="formState.text" placeholder="Ex: Manger ton sperme" required />
                </UFormGroup>
                <UFormGroup label="Difficulté à répondre" name="level">
                    <div class="flex justify-between items-end text-gray-400 mb-1 text-xs">
                        <p>1</p>
                        <p class="text-base text-white">{{ formState.level }}</p>
                        <p>5</p>
                    </div>
                    <URange v-model="formState.level" :min="1" :max="5" :step="1" />
                </UFormGroup>
                <UFormGroup label="Qualification" name="level">
                    <div class="flex gap-8">
                        <URadio
                            v-for="radioOption of radioOptions"
                            :key="radioOption.value"
                            v-model="formState.type"
                            v-bind="radioOption"
                        />
                    </div>
                </UFormGroup>
                <UButton type="submit" block :loading="isSubmitting">Envoyer</UButton>
            </UForm>
        </div>
        <div v-else>
            <div class="flex flex-col justify-center items-center gap-8">
                <p>Ta moitié de tu préfères à été créer avec succès</p>
                <UButton @click="onRestartFormClick">Recommencer</UButton>
            </div>
        </div>
    </UContainer>
</template>

<script>
export default {
    name: `UploadPage`,

    setup() {
        const runtimeConfig = useRuntimeConfig();

        const formState = ref({
            text: ``,
            type: `good`,
            level: 1,
        });

        const radioOptions = [
            {
                value: `good`,
                label: `Positif`,
            },
            {
                value: `bad`,
                label: `Négatif`,
            },
        ];

        console.log(this);

        const isSubmitting = ref(false);
        const hasBeenSubmitted = ref(false);

        function onRestartFormClick() {
            hasBeenSubmitted.value = false;

            formState.value.text = ``;
            formState.value.type = `good`;
            formState.value.level = 1;
        }

        async function onSubmit() {
            isSubmitting.value = true;

            await useFetch(`${runtimeConfig.public.API_URL}/api/questions`, {
                method: `post`,
                body: {
                    data: {
                        text: formState.value.text,
                        type: formState.value.type,
                        level: formState.value.level,
                    },
                },
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
                .then(() => {
                    hasBeenSubmitted.value = true;
                    isSubmitting.value = false;
                });
        }

        return {
            formState,
            onSubmit,
            radioOptions,
            isSubmitting,
            hasBeenSubmitted,
            onRestartFormClick,
        };
    },
};
</script>
