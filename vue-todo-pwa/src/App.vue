<template>
  <v-app>
    <!-- 전체영역을 카드 UI로 변경하여 색상의 일관성 유지 -->
    <v-card>
      <v-app-bar dark color="lime">
        <!-- 좌측에 메뉴 아이콘 넣음 -->
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>To-Do 리스트</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row my-5>
            <v-col cols="8" offset="1">
              <!-- 실행되자 마자 입력포커스를 가지도록 autofocus 설정 -->
              <v-text-field label="할 일" autofocus v-model="sTodoTitle">
              </v-text-field>
            </v-col>
            <v-col cols="2" my-2>
              <v-btn
                fab
                max-height="50px"
                max-width="50px"
                color="pink"
                dark
                @click="fnSubmitTodo()"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-list two-line v-for="item in oTodos" :key="item.key">
                <!-- item.b_edit값을 통해 읽기모드인 경우만 표시 -->
                <v-card flat color="grey lighten-3" v-if="!item.b_edit">
                  <!-- 항목을 하나씩 가져와서 tile 단위로 표시함 -->
                  <v-list-item class="py-2">
                    <v-list-item-action>
                      <!-- 첵크박스 표시하고 선택되면 변경상태 DB에 저장 -->
                      <v-checkbox
                        v-model="item.b_completed"
                        @change="fnCheckboxChange(item)"
                      ></v-checkbox>
                    </v-list-item-action>
                    <!-- 제목을 표시하고 첵크선택되면 취소선 표시 -->
                    <v-list-item-content>
                      <v-list-item-title
                        :class="{ style_completed: item.b_completed }"
                      >
                        {{ item.todo_title }}
                      </v-list-item-title>
                      <!-- 두번째 줄에 아이콘 배치 -->
                      <v-list-item-subtitle class="mt-2">
                        <!-- 수정 아이콘 표시하고 클릭하면 수정모드로 변경함 -->
                        <v-icon
                          class="pointer"
                          @click="fnSetEditTodo(item['.key'])"
                          >create</v-icon
                        >
                        <!-- 삭제 아이콘 표시하고 클릭하면 해당 item 삭제 -->
                        <v-icon
                          class="pointer"
                          @click="fnRemoveTodo(item['.key'])"
                          >delete</v-icon
                        >
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
                <!-- item.b_edit값을 통해 수정모드인 경우 어둡게 표시 -->
                <v-card v-else dark>
                  <v-list-item class="py-2">
                    <v-list-item-action>
                      <v-checkbox v-model="item.b_completed"></v-checkbox>
                    </v-list-item-action>
                    <!-- v-list-item안에서 텍스트입력과 버튼 사용을 위해
										v-card 엘리먼트 사용 -->
                    <v-card-text>
                      <!-- 포커스를 입력창으로 바로 옮기고 삭제 아이콘도 추가함 -->
                      <v-text-field
                        autofocus
                        clearable
                        v-model="item.todo_title"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <!-- 수정모드에서 '저장' 아이콘 클릭하면 해당 item 저장 -->
                      <v-icon class="pointer" @click="fnSaveEdit(item)"
                        >save</v-icon
                      >
                      <v-icon
                        class="pointer"
                        @click="fnCancelEdit(item['.key'])"
                        >cancel</v-icon
                      >
                    </v-card-actions>
                  </v-list-item>
                </v-card>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
import { oTodosinDB } from "@/datasources/firebase";

export default {
  name: "App",
  data() {
    return {
      oTodos: [],
      sTodoTitle: "",
    };
  },
  firebase: {
    oTodos: oTodosinDB,
  },
  methods: {
    fnSubmitTodo() {
      oTodosinDB.push({
        todo_title: this.sTodoTitle,
        b_completed: false,
        b_edit: false,
      });
      this.sTodoTitle = "";
    },
    fnRemoveTodo(pKey) {
      oTodosinDB.child(pKey).remove();
    },
    fnSetEditTodo(pKey) {
      oTodosinDB.child(pKey).update({
        b_edit: true,
      });
    },
    fnCancelEdit(pKey) {
      oTodosinDB.child(pKey).update({
        b_edit: false,
      });
    },
    fnSaveEdit(pItem) {
      const sKey = pItem[".key"];
      oTodosinDB.child(sKey).set({
        todo_title: pItem.todo_title,
        b_completed: pItem.b_completed,
        b_edit: false,
      });
    },
    fnCheckboxChange(pItem) {
      const sKey = pItem[".key"];
      oTodosinDB.child(sKey).update({
        b_completed: pItem.b_completed,
      });
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.style_completed {
  text-decoration: line-through;
}
</style>
