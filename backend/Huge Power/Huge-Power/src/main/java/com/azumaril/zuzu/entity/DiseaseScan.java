package com.azumaril.zuzu.entity;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document(collection = "disease_scans")
public class DiseaseScan {

    @Id
    private String id;
    private String userId;
    private String crop;
    private String disease;
    private String symptoms;
    private Treatment treatment;
    private String precautions;

    private String imageUrl;  // Stored image path/URL
    private Double confidenceScore;
    private LocalDateTime scanDate;

    public LocalDateTime getScanDate() {
        return scanDate;
    }

    public void setScanDate(LocalDateTime scanDate) {
        this.scanDate = scanDate;
    }

    public Double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(Double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPrecautions() {
        return precautions;
    }

    public void setPrecautions(String precautions) {
        this.precautions = precautions;
    }

    public Treatment getTreatment() {
        return treatment;
    }

    public void setTreatment(Treatment treatment) {
        this.treatment = treatment;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Builder
    @Data
    static class Treatment {
        private String chemical;
        private String organic;
        private String schedule;
        private String quantity;
    }

}

