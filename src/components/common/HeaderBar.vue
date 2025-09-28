<template>
  <div
    class="bg-white flex flex-col sm:flex-row justify-between items-center p-4 shadow-md font-sans relative"
  >
    <!-- Date -->
    <div class="flex items-center gap-2 mb-2 sm:mb-0">
      <p class="font-bold text-lg text-gray-800">📅 Date:</p>
      <p class="text-lg text-gray-600">{{ formattedDate }}</p>
    </div>

    <!-- Search & Profile -->
    <div class="flex items-center gap-3 w-full sm:w-auto relative">
      <!-- Search box -->
      <div class="relative w-full max-w-xs">
        <input
          v-model="searchQuery"
          class="rounded-full bg-gray-100 px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          type="search"
          placeholder="Search..."
          @input="$emit('search', searchQuery)"
        />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      <!-- Avatar -->
      <div class="relative">
        <div
          ref="avatar"
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg cursor-pointer hover:scale-105 transition select-none overflow-hidden bg-indigo-600"
          @click="toggleDropdown"
          :title="localUserName || 'Guest'"
          aria-haspopup="true"
          aria-expanded="isDropdownOpen"
        >
          <img
            v-if="localUserAvatar"
            :src="localUserAvatar"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
          <span v-else>{{ userInitial }}</span>
        </div>

        <!-- Dropdown -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div
            v-if="isDropdownOpen"
            ref="dropdown"
            class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
          >
            <div class="px-4 py-3 border-b">
              <p class="text-sm text-gray-600">Signed in as</p>
              <p class="font-semibold text-gray-800 truncate">
                {{ localUserName || "Guest" }}
              </p>
              <p class="text-xs text-gray-500 mt-0.5">
                {{ localUserEmail || "" }}
              </p>
            </div>
            <ul class="py-1">
              <li>
                <button
                  @click="openProfile"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  👤 Profile
                </button>
              </li>
              <li>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

    <!-- Profile Modal -->
    <transition name="fade">
      <div
        v-if="showProfileModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
          <h2 class="text-xl font-bold mb-4">Edit Profile</h2>

          <!-- Avatar Upload -->
          <div class="flex flex-col items-center mb-4">
            <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                v-if="localUserAvatar"
                :src="localUserAvatar"
                alt="Avatar"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-3xl font-bold text-gray-500">{{ userInitial }}</span>
            </div>
            <input type="file" accept="image/*" class="mt-3" @change="onFileChange" />
          </div>

          <!-- Name -->
          <div class="mb-3">
            <label class="block text-gray-700 mb-1">Name</label>
            <input
              v-model="localUserName"
              type="text"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label class="block text-gray-700 mb-1">Email</label>
            <input
              v-model="localUserEmail"
              type="email"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label class="block text-gray-700 mb-1">Password</label>
            <input
              v-model="localUserPassword"
              type="password"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button
              @click="showProfileModal = false"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              @click="saveProfile"
              class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    userName: { type: String, default: "" },
    userEmail: { type: String, default: "" },
    currentDate: { type: Date, default: () => new Date() },
  },
  data() {
    return {
      searchQuery: "",
      isDropdownOpen: false,
      localUserName: "",
      localUserEmail: "",
      localUserPassword: "",
      localUserAvatar: "",
      showProfileModal: false,
    };
  },
  computed: {
    userInitial() {
      const name = (this.localUserName || "").trim();
      return name ? name.charAt(0).toUpperCase() : "G";
    },
    formattedDate() {
      const options = { weekday: "long", day: "2-digit", month: "short", year: "numeric" };
      return new Intl.DateTimeFormat("en-GB", options).format(this.currentDate);
    },
  },
  mounted() {
    this.localUserName = this.userName || localStorage.getItem("userName") || "";
    this.localUserEmail = this.userEmail || localStorage.getItem("userEmail") || "";

    const avatars = JSON.parse(localStorage.getItem("avatars") || "{}");
    this.localUserAvatar = avatars[this.localUserName] || "";

    document.addEventListener("click", this.onDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onDocumentClick);
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    onDocumentClick(e) {
      if (!this.isDropdownOpen) return;
      const dropdown = this.$refs.dropdown;
      const avatar = this.$refs.avatar;
      if (dropdown && dropdown.contains(e.target)) return;
      if (avatar && avatar.contains(e.target)) return;
      this.isDropdownOpen = false;
    },
    openProfile() {
      this.isDropdownOpen = false;
      this.showProfileModal = true;
    },
    handleLogout() {
      this.isDropdownOpen = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      this.$emit("logout");
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.localUserAvatar = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveProfile() {
      localStorage.setItem("userName", this.localUserName);
      localStorage.setItem("userEmail", this.localUserEmail);

      let avatars = JSON.parse(localStorage.getItem("avatars") || "{}");
      avatars[this.localUserName] = this.localUserAvatar;
      localStorage.setItem("avatars", JSON.stringify(avatars));

      this.showProfileModal = false;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
