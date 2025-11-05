package com.azumaril.zuzu.repository;

import com.azumaril.zuzu.entity.DiseaseScan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiseaseScanRepository extends MongoRepository<DiseaseScan, String> {

    List<DiseaseScan> findByUserId(String userId);
    List<DiseaseScan> findByCrop(String crop);
    List<DiseaseScan> findByDisease(String disease);
}
