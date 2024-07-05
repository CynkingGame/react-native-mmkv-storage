package com.mj.app;

import android.graphics.Color;
import android.os.Bundle;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class TestActivity extends AppCompatActivity  {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 创建一个全屏的 FrameLayout 作为容器
        FrameLayout frameLayout = new FrameLayout(this);
        FrameLayout.LayoutParams frameLayoutParams = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        );
        frameLayout.setLayoutParams(frameLayoutParams);

        // 创建一个居中的 TextView
        TextView textView = new TextView(this);
        textView.setText("Hello World");
        textView.setTextColor(Color.BLACK);
        textView.setTextSize(24);
        textView.setGravity(Gravity.CENTER);

        // 设置 TextView 的布局参数
        FrameLayout.LayoutParams textViewParams = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );
        textViewParams.gravity = Gravity.CENTER;

        // 将 TextView 添加到 FrameLayout 中
        frameLayout.addView(textView, textViewParams);

        // 将 FrameLayout 设置为 Activity 的内容视图
        setContentView(frameLayout);
    }
}
