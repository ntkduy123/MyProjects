package com.projects.demo.modules.aws.constant;

public class AWSConstants {
    public static final String ACCESS_KEY = System.getenv("AWS_ACCESS_KEY_ID");
    public static final String SECRET_KEY = System.getenv("AWS_SECRET_ACCESS_KEY");
    public static final String BUCKET_NAME = System.getenv("AWS_BUCKET_NAME");
}
