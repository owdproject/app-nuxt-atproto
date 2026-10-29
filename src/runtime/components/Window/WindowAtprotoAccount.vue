<script setup lang="ts">
import { useAtprotoAccountStore } from '@owdproject/module-nuxt-atproto/runtime/stores/storeAtprotoAccount'
import AtprotoDesktopOwner from '../AtprotoDesktop/AtprotoDesktopOwner.vue'
import { onBeforeMount, watch } from 'vue'
import { computed } from '@vue/reactivity'
import { useI18n } from 'vue-i18n'
import { useAtproto } from '#imports'

const props = defineProps<{
  window: IWindowController
}>()

const atproto = useAtproto()

const atprotoAccountStore = useAtprotoAccountStore()
const { t } = useI18n()

onBeforeMount(() => {
  if (atprotoAccountStore.isAccountLogged) {
    props.window.actions.setTitleOverride(atprotoAccountStore.account.handle)
  }
})

watch(
  () => atprotoAccountStore.account,
  (account) => {
    if (atprotoAccountStore.isAccountLogged) {
      props.window.actions.setTitleOverride(account.handle)
    } else {
      props.window.actions.resetTitleOverride()
    }
  },
)

function onServiceResolverChange() {
  if (atprotoAccountStore.isAccountLogged) {
    // already logged, can't change resolver now
    return
  }

  const customServiceResolver = window.prompt(
    t('atproto.login.resolver.prompt'),
    atprotoAccountStore.handleResolver,
  )

  if (customServiceResolver) {
    atprotoAccountStore.handleResolver = customServiceResolver
  }
}

const accountLabel = computed(() => {
  if (
    (atprotoAccountStore.isAccountLogged &&
      !atprotoAccountStore.account.avatar) ||
    !atprotoAccountStore.isAccountLogged
  ) {
    return '?'
  }

  return undefined
})

const accountAvatar = computed(() => {
  if (
    atprotoAccountStore.isAccountLogged &&
    atprotoAccountStore.account.avatar
  ) {
    return atprotoAccountStore.account.avatar
  }

  return undefined
})

function onSignIn() {
  atproto.signIn()
}

function onSignOut() {
  atproto.signOut()
  atprotoAccountStore.reset()
}
</script>

<template>
  <DesktopWindow :window="window" :content="{ padded: true, centered: true }">
    <div class="flex flex-col h-full">
      <AtprotoDesktopOwner />

      <div class="owd-atproto-login flex-1 text-center">
        <div>
          <div>
            <Avatar
              :label="accountLabel"
              :image="accountAvatar"
              size="xlarge"
              shape="circle"
            >
              <Skeleton
                v-if="atprotoAccountStore.state.fetching"
                width="100%"
                height="100%"
                borderRadius="50%"
              />
            </Avatar>
          </div>

          <Button
            v-if="
              !atprotoAccountStore.isAccountLogged &&
              !atprotoAccountStore.state.fetching
            "
            size="large"
            v-text="$t('atproto.login.actions.login')"
            @click="onSignIn"
          />

          <Button
            v-if="atprotoAccountStore.isAccountLogged"
            size="large"
            v-text="$t('atproto.login.actions.logout')"
            @click="onSignOut"
          />
        </div>
      </div>

      <div class="text-center opacity-35">
        {{ $t('atproto.login.resolver.using') }}
        <span
          :class="{
            'cursor-pointer': !atprotoAccountStore.isAccountLogged,
          }"
          v-text="atprotoAccountStore.handleResolverHostname"
          @click="onServiceResolverChange()"
        />
      </div>
    </div>
  </DesktopWindow>
</template>

<style scoped lang="scss">
.owd-atproto {
  &-login {
    align-content: center;

    .p-avatar {
      width: 120px;
      height: 120px;
      margin: 0 0 32px 0;
      text-transform: uppercase;
      font-size: 32px;
    }
  }
}
</style>
